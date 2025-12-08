import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import type { CartItem } from "../../types/carts";
import type { Order, OrderAddress } from "../../types/orders";
import { createOrder } from "../../services/db/orders";
import { clearCart } from "../../store/cartSlice";
import { AppButton } from "../../styles/AppButton";
import { 
  Title,
  Layout,
  FormCard,
  SummaryCard,
  SectionTitle,
  FieldGroup,
  Label,
  Input,
  Textarea,
  RadioRow,
  RadioOption,
  ErrorText,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SummaryTotalRow,
  ItemsList,
  ItemRow,
  GroupTitle,
  InfoText,
  EmptyCartText,
  BackButtonWrapper,
  PageHeaderRow,
  BackButton,
} from "./CheckoutPage.styles";
import { getShortDate } from "../../utils/dates";
import { AppPageWrapper } from "../../styles/AppPageWrapper";

type FulfillmentType = "pickup" | "delivery";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items as CartItem[]);
  const userRedux = useAppSelector((state) => state.user?.user); // адаптирай към твоя auth slice

  const [customerName, setCustomerName] = useState(userRedux?.name || "");
  const [customerPhone, setCustomerPhone] = useState(
    userRedux?.phoneNumber || ""
  );
  const [customerNotes, setCustomerNotes] = useState("");

  const [fulfillmentType, setFulfillmentType] =
    useState<FulfillmentType>("pickup");

  const [address, setAddress] = useState<OrderAddress | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hasItems = cartItems.length > 0;

  // Group by selectedDate
  const groups = cartItems.reduce((acc, item) => {
    const dateKey = item.selectedDate || "Без дата";
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const groupedDates = Object.keys(groups).sort(); // ["2025-12-19", "2025-12-21"...]

  const subtotalAll = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const deliveryFeeAll =
    fulfillmentType === "delivery" ? groupedDates.length * 5 : 0;

  const handleAddressChange =
    (field: keyof OrderAddress) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setAddress((prev) => ({
        ...(prev || { street: "" }),
        [field]: value,
      }));
    };

  const validate = () => {
    if (!hasItems) {
      setSubmitError("Количката е празна.");
      return false;
    }
    if (!customerName.trim()) {
      setSubmitError("Моля, въведи име.");
      return false;
    }
    if (!customerPhone.trim()) {
      setSubmitError("Моля, въведи телефон.");
      return false;
    }
    if (fulfillmentType === "delivery") {
      if (!address?.street?.trim()) {
        setSubmitError("Моля, въведи улица за доставка.");
        return false;
      }
    }
    setSubmitError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const orderIds: string[] = [];

      //  Different orders per date group
      for (const date of groupedDates) {
        const itemsForDate = groups[date];

        const subtotal = itemsForDate.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

        // Calculate delivery fee
        const deliveryFee = fulfillmentType === "delivery" ? 5 : 0;

        const total = subtotal + deliveryFee;

        const orderPayload: Omit<Order, "id" | "createdAt"> = {
          userId: userRedux?.id || null,
          status: "pending",

          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerNotes: customerNotes.trim() || undefined,

          fulfillmentType,
          scheduledDate: date,
          address: fulfillmentType === "delivery" ? address || null : null,

          subtotal,
          deliveryFee,
          total,
          currency: "BGN",

          paymentStatus: "unpaid",
          paymentMethod: "cash",

          items: itemsForDate,
        };

        const orderId = await createOrder(orderPayload);
        orderIds.push(orderId);
      }

      dispatch(clearCart());

      // navigate to success page with order details
      // navigate("/checkout/success", {
      //   state: { orderIds, dates: groupedDates },
      // });
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Нещо се обърка при създаването на поръчките. Моля, опитай отново."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasItems) {
    return (
      <AppPageWrapper>
        <Title>Поръчка</Title>

        <EmptyCartText>
          Количката е празна. Можеш да добавиш сладкиши от секция „Десерти“, а
          после да се върнеш тук за финализиране. 🍰
        </EmptyCartText>
      </AppPageWrapper>
    );
  }

  return (
    <AppPageWrapper>
      <PageHeaderRow>
        <BackButtonWrapper>
          <BackButton
            onClick={() => navigate(-1)}
            $variant="text" 
          >
            ← Назад към количката
          </BackButton>
        </BackButtonWrapper>

        <Title>Поръчка</Title>
      </PageHeaderRow>

      <Layout>{/* ... останалата част на checkout-а */}</Layout>

      <Layout>
        <FormCard>
          <form onSubmit={handleSubmit}>
            <SectionTitle>Данни за контакт</SectionTitle>

            <FieldGroup>
              <Label htmlFor="name">Име*</Label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Име и фамилия"
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="phone">Телефон*</Label>
              <Input
                id="phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Телефон за връзка"
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="notes">Бележка към поръчката</Label>
              <Textarea
                id="notes"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Алергии, предпочитания, специфични инструкции…"
              />
            </FieldGroup>

            <SectionTitle>Получаване</SectionTitle>

            <RadioRow>
              <RadioOption>
                <input
                  type="radio"
                  name="fulfillment"
                  value="pickup"
                  checked={fulfillmentType === "pickup"}
                  onChange={() => setFulfillmentType("pickup")}
                />
                <span>Взимане на място</span>
              </RadioOption>

              <RadioOption>
                <input
                  type="radio"
                  name="fulfillment"
                  value="delivery"
                  checked={fulfillmentType === "delivery"}
                  onChange={() => setFulfillmentType("delivery")}
                />
                <span>Доставка</span>
              </RadioOption>
            </RadioRow>

            {fulfillmentType === "delivery" && (
              <>
                <FieldGroup>
                  <Label htmlFor="street">Улица и номер*</Label>
                  <Input
                    id="street"
                    value={address?.street || ""}
                    onChange={handleAddressChange("street")}
                    placeholder="ул. Примерна 12"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="building">Блок / сграда</Label>
                  <Input
                    id="building"
                    value={address?.building || ""}
                    onChange={handleAddressChange("building")}
                    placeholder="Блок, сграда"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="entrance">Вход / етаж / ап.</Label>
                  <Input
                    id="entrance"
                    value={address?.entrance || ""}
                    onChange={handleAddressChange("entrance")}
                    placeholder="Вход, етаж, апартамент"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="addressNotes">Бележка за адреса</Label>
                  <Input
                    id="addressNotes"
                    value={address?.notes || ""}
                    onChange={handleAddressChange("notes")}
                    placeholder="Оранжева врата, до парка..."
                  />
                </FieldGroup>
              </>
            )}

            {submitError && <ErrorText>{submitError}</ErrorText>}

            <AppButton
              type="submit"
              $fullWidth
              $variant="primary"
              $marginTop="1.4rem"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Записване на поръчките..."
                : groupedDates.length > 1
                ? `Финализирай ${groupedDates.length} поръчки`
                : "Финализирай поръчката"}
            </AppButton>
          </form>
        </FormCard>

        <SummaryCard>
          <SectionTitle>Обобщение</SectionTitle>

          {groupedDates.length > 1 && (
            <InfoText>
              В количката ти има продукти с различни дати. Ще бъдат създадени
              отделни поръчки за всяка дата.
            </InfoText>
          )}

          {groupedDates.map((date) => {
            const itemsForDate = groups[date];
            const subtotal = itemsForDate.reduce(
              (sum, item) => sum + item.totalPrice,
              0
            );
            return (
              <div key={date}>
                <GroupTitle>Дата: {date}</GroupTitle>
                <ItemsList>
                  {itemsForDate.map((item) => (
                    <ItemRow key={item.id}>
                      <span>
                        {item.quantity}× {item.title}
                      </span>
                      <span>{item.totalPrice.toFixed(2)} лв.</span>
                    </ItemRow>
                  ))}
                </ItemsList>
                <SummaryRow>
                  <SummaryLabel>
                    Междинна сума за {getShortDate(date)}
                  </SummaryLabel>
                  <SummaryValue>{subtotal.toFixed(2)} лв.</SummaryValue>
                </SummaryRow>
              </div>
            );
          })}

          <SummaryRow>
            <SummaryLabel>Междинна сума (общо)</SummaryLabel>
            <SummaryValue>{subtotalAll.toFixed(2)} лв.</SummaryValue>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabel>
              {groupedDates.length > 1
                ? "Доставка за всички дати (общо)"
                : "Доставка"}
            </SummaryLabel>
            <SummaryValue>{deliveryFeeAll.toFixed(2)} лв.</SummaryValue>
          </SummaryRow>

          <SummaryTotalRow>
            <SummaryLabel>Общо</SummaryLabel>
            <SummaryValue>
              {(subtotalAll + deliveryFeeAll).toFixed(2)} лв.
            </SummaryValue>
          </SummaryTotalRow>
        </SummaryCard>
      </Layout>
    </AppPageWrapper>
  );
};

export default CheckoutPage;
