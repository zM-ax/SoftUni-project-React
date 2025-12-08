import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Order } from "../../types/orders";
import { getOrderById } from "../../services/db/orders";
import { AppButton } from  "../../styles/AppButton";
import {
  PageContainer,
  HeaderRow,
  BackButtonWrapper,
  Title,
  Card,
  Row,
  Label,
  Value,
  ItemsList,
  ItemRow,
  SectionTitle,
  ErrorText,
  LoadingText,
} from "./OrderDetailsPage.styles"; 
import type { CartItem } from "../../types/carts";

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const load = async () => {
      try {
        setIsLoading(true);
        const data = await getOrderById(orderId);
        if (!data) {
          setError("Поръчката не беше намерена.");
        } else {
          setOrder(data);
        }
      } catch (err) {
        console.error(err);
        setError("Грешка при зареждане на поръчката.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [orderId]);

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingText>Зареждам поръчката…</LoadingText>
      </PageContainer>
    );
  }

  if (error || !order) {
    return (
      <PageContainer>
        <BackButtonWrapper>
          <AppButton
            $variant="text"
            onClick={() => navigate(-1)}
            style={{ color: "inherit" }}
          >
            ← Назад
          </AppButton>
        </BackButtonWrapper>
        <ErrorText>{error || "Поръчката не беше намерена."}</ErrorText>
      </PageContainer>
    );
  }

  const itemsTotalCount = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const addressText =
    order.fulfillmentType === "delivery" && order.address
      ? [
          order.address.street,
          order.address.building,
          order.address.entrance,
          order.address.notes,
        ]
          .filter(Boolean)
          .join(", ")
      : "-";

  return (
    <PageContainer>
      <HeaderRow>
        <BackButtonWrapper>
          <AppButton
            $variant="text"
            onClick={() => navigate(-1)}
            style={{ color: "inherit" }}
          >
            ← Назад към поръчките
          </AppButton>
        </BackButtonWrapper>

        <Title>Детайли за поръчка</Title>
      </HeaderRow>

      <Card>
        <Row>
          <Label>Поръчка ID:</Label>
          <Value>{order.id}</Value>
        </Row>
        <Row>
          <Label>Дата:</Label>
          <Value>{order.scheduledDate}</Value>
        </Row>
        <Row>
          <Label>Статус:</Label>
          <Value>{order.status}</Value>
        </Row>
        <Row>
          <Label>Начин на получаване:</Label>
          <Value>
            {order.fulfillmentType === "delivery"
              ? "Доставка"
              : "Взимане на място"}
          </Value>
        </Row>
        <Row>
          <Label>Адрес:</Label>
          <Value>{addressText}</Value>
        </Row>

        <SectionTitle>Артикули</SectionTitle>
        <ItemsList>
          {order.items.map((item: CartItem) => (
            <ItemRow key={item.id}>
              <span>
                {item.quantity} × {item.title}
              </span>
              <span>{item.totalPrice.toFixed(2)} лв.</span>
            </ItemRow>
          ))}
        </ItemsList>
        <Row>
          <Label>Общ брой:</Label>
          <Value>{itemsTotalCount} бр.</Value>
        </Row>

        <SectionTitle>Суми</SectionTitle>
        <Row>
          <Label>Междинна сума:</Label>
          <Value>{order.subtotal.toFixed(2)} лв.</Value>
        </Row>
        <Row>
          <Label>Доставка:</Label>
          <Value>{order.deliveryFee.toFixed(2)} лв.</Value>
        </Row>
        <Row>
          <Label>Общо:</Label>
          <Value>{order.total.toFixed(2)} лв.</Value>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default OrderDetailsPage;
