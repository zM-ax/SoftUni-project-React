import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import type { Order, OrderStatus } from "../../types/orders";
import { getOrdersForUser } from "../../services/db/orders";
import {
  ErrorText,
  InfoText,
  ItemsPreview,
  LoadingText,
  OrderCard,
  OrderDate,
  OrderMetaRow,
  OrderPriceRow,
  OrdersList,
  OrdersSection,
  OrderStatusBadge,
  OrderTopRow,
  OrderTotal,
  Title,
} from "./OrdersSection.styles";

const translateStatus = (status: OrderStatus): string => {
  switch (status) {
    case "pending":
      return "Чака потвърждение";
    case "confirmed":
      return "Потвърдена";
    case "in_progress":
      return "В процес";
    case "completed":
      return "Завършена";
    case "cancelled":
      return "Отказана";
    default:
      return status;
  }
};

const OrdersSectionComponent: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getOrdersForUser(user.id);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Грешка при зареждане на поръчките.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [user?.id]);

  return (
    <OrdersSection>
      <Title>Поръчки</Title>

      {!user && (
        <InfoText>
          За да виждаш направените от теб поръчки, трябва да си влязла в профила
          си.
        </InfoText>
      )}

      {user && orders.length === 0 && !isLoading && !error && (
        <InfoText>
          Все още нямаш поръчки през сайта. Когато направиш поръчка, тя ще се
          появи тук. 🍰
        </InfoText>
      )}

      {isLoading && <LoadingText>Зареждам поръчките…</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!isLoading && !error && orders.length > 0 && (
        <>
          <InfoText>
            Виждаш поръчките, направени с този профил, подредени по дата.
          </InfoText>

          <OrdersList>
            {orders.map((order) => {
              const itemsCount = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              );
              const firstItemsNames = order.items
                .slice(0, 2)
                .map((i) => i.title)
                .join(", ");

              const moreCount =
                order.items.length > 2 ? order.items.length - 2 : 0;

              return (
                <OrderCard key={order.id}>
                  <OrderTopRow>
                    <OrderDate>Дата: {order.scheduledDate}</OrderDate>
                    <OrderStatusBadge $status={order.status}>
                      {translateStatus(order.status)}
                    </OrderStatusBadge>
                  </OrderTopRow>

                  <OrderMetaRow>
                    <span>
                      {order.fulfillmentType === "delivery"
                        ? "Доставка"
                        : "Взимане на място"}
                    </span>
                    <span>{itemsCount} бр. артикули</span>
                  </OrderMetaRow>

                  <OrderPriceRow>
                    <span>Общо:</span>
                    <OrderTotal>{order.total.toFixed(2)} лв.</OrderTotal>
                  </OrderPriceRow>

                  <ItemsPreview>
                    {firstItemsNames}
                    {moreCount > 0 && ` + още ${moreCount}`}
                  </ItemsPreview>
                </OrderCard>
              );
            })}
          </OrdersList>
        </>
      )}
    </OrdersSection>
  );
};

export default OrdersSectionComponent;
