import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import type { Order, OrderStatus } from "../../types/orders";
import { getOrdersForUser, cancelOrder } from "../../services/db/orders";
import { useNavigate } from "react-router-dom";
import { AppButton } from "../../styles/AppButton";
import { buildOrderItemsPreview } from "../../utils/orderItemsPreview";
import {
  ErrorText,
  InfoText,
  ItemsPreview,
  OrderCancelButton,
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
import AppSpinner from "../../components/AppSpinner";

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

const canCancelOrder = (order: Order): boolean => {
  if (order.status === "cancelled") return false;

  // ако е pending -> може да се отказва винаги
  if (order.status === "pending") return true;

  // иначе – може само ако има повече от 2 дни до датата
  if (!order.scheduledDate) return false;

  const now = new Date();
  const deliveryDate = new Date(order.scheduledDate); // очакваме YYYY-MM-DD

  if (isNaN(deliveryDate.getTime())) return false;

  const diffMs = deliveryDate.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays > 2;
};

const OrdersSectionComponent: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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

  const handleCancelOrder = async (order: Order) => {
    if (!order.id) return;

    if (!canCancelOrder(order)) {
      alert(
        "Тази поръчка не може да бъде отказана. " +
          "Може да се отказват само поръчки в статус 'Чака потвърждение' " +
          "или такива, за които има повече от 2 дни до датата на получаване."
      );
      return;
    }

    const confirmed = window.confirm(
      "Сигурни ли сте, че искате да откажете тази поръчка?"
    );

    if (!confirmed) return;

    try {
      await cancelOrder(order.id);

      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: "cancelled" } : o))
      );
    } catch (err) {
      console.error(err);
      alert("Нещо се обърка при отказване на поръчката. Моля, опитай отново.");
    }
  };

  const handleViewDetails = (order: Order) => {
    if (!order.id) return;
    navigate(`/my-orders/${order.id}`);
  };

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

      {isLoading && <AppSpinner>Зареждам поръчките…</AppSpinner>}
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

              const { previewText, tooltipText, uniqueItemsCount } =
                buildOrderItemsPreview(order.items);

              const moreCount = uniqueItemsCount > 2 ? uniqueItemsCount - 2 : 0;

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

                  <OrderPriceRow>
                    <span>Продукти:</span>
                    <OrderTotal title={tooltipText}>
                      {previewText}
                      {moreCount > 0 && ` + още ${moreCount}`}
                    </OrderTotal>
                  </OrderPriceRow>

                  <ItemsPreview>
                    {canCancelOrder(order) && (
                      <OrderCancelButton
                        type="button"
                        $variant="text"
                        style={{marginRight: '1rem'}}
                        onClick={() => handleCancelOrder(order)}
                      >
                        Откажи
                      </OrderCancelButton>
                    )}

                    <AppButton
                      type="button"
                      $variant="text"
                      onClick={() => handleViewDetails(order)}
                    >
                      Виж детайли
                    </AppButton>
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
