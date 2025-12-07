import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  PageContainer,
  CartTitle,
  CartContent,
  ItemsColumn,
  SummaryColumn,
  EmptyCartWrapper,
  EmptyCartText,
  CartHeaderRow,
  HeaderLabel,
  CartItemRow,
  ItemInfo,
  ItemImage,
  ItemTexts,
  ItemTitle,
  ItemMeta,
  QuantityWrapper,
  QuantityButton,
  QuantityValue,
  SubtotalCell,
  SummaryCard,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SummaryTotalRow,
} from "./CartPage.styles";

import type { CartItem } from "../../types/carts";
import {
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
} from "../../store/cartSlice";
import { useNavigate } from "react-router";
import { AppButton } from "../../styles/AppButton";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items as CartItem[]);
  const hasItems = cartItems.length > 0;
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleIncrease = (item: CartItem) => {
    const newQuantity = item.quantity + 1;
    dispatch(
      updateCartItemQuantity({
        id: item.id,
        quantity: newQuantity,
      })
    );
  };

  const handleDecrease = (item: CartItem) => {
    if (item.quantity <= 1) return;
    const newQuantity = item.quantity - 1;
    dispatch(
      updateCartItemQuantity({
        id: item.id,
        quantity: newQuantity,
      })
    );
  };

  const handleRemove = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!hasItems) {
    return (
      <PageContainer>
        <CartTitle>Твоята количка</CartTitle>
        <EmptyCartWrapper>
          <EmptyCartText>
            Количката ти е празна… но това може да се поправи 🍰
          </EmptyCartText>

          <AppButton onClick={() => navigate("/products")} $variant="primary">
            Към десертите
          </AppButton>
        </EmptyCartWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <CartTitle>Твоята количка</CartTitle>

      <CartContent>
        {/* *********************** LEFT COLUMN - PRODUCTS *********************** */}
        <ItemsColumn>
          <CartHeaderRow>
            <HeaderLabel $align="left">Продукт</HeaderLabel>
            <HeaderLabel>Дата</HeaderLabel>
            <HeaderLabel>Количество</HeaderLabel>
            <HeaderLabel>Сума</HeaderLabel>
          </CartHeaderRow>

          {cartItems.map((item) => (
            <CartItemRow key={item.id}>
              <ItemInfo>
                {item.imageUrl && (
                  <ItemImage
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                  />
                )}

                <ItemTexts>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemMeta>
                    {item.cartItemType === "catalog"
                      ? "Каталог"
                      : "Направи си сам"}{" "}
                    • {item.unitPrice.toFixed(2)} лв. / бр.
                  </ItemMeta>
                </ItemTexts>
              </ItemInfo>

              {/* ********* Delivery date ********* */}
              <ItemMeta>{item.selectedDate}</ItemMeta>

              <QuantityWrapper>
                <QuantityButton
                  type="button"
                  onClick={() => handleDecrease(item)}
                  disabled={item.quantity <= 1}
                >
                  −
                </QuantityButton>
                <QuantityValue>{item.quantity}</QuantityValue>
                <QuantityButton
                  type="button"
                  onClick={() => handleIncrease(item)}
                >
                  +
                </QuantityButton>
              </QuantityWrapper>

              <SubtotalCell>{item.totalPrice.toFixed(2)} лв.</SubtotalCell>

              <AppButton
                $variant="ghost"
                onClick={() => handleRemove(item.id)}
                style={{ position: "absolute", top: "0.4rem", right: "0.4rem" }}
              >
                ✕
              </AppButton>
            </CartItemRow>
          ))}

          <AppButton
            $variant="text"
            onClick={handleClearCart}
            $marginTop="1rem"
          >
            Изчисти количката
          </AppButton>
        </ItemsColumn>

        {/* *********************** RIGHT COLUMN - SUMMARY *********************** */}
        <SummaryColumn>
          <SummaryCard>
            <SummaryRow>
              <SummaryLabel>Междинна сума</SummaryLabel>
              <SummaryValue>{totalPrice.toFixed(2)} лв.</SummaryValue>
            </SummaryRow>

            <SummaryTotalRow>
              <SummaryLabel>Дата/и за взимане</SummaryLabel>
              <SummaryValue>
                {[...new Set(cartItems.map((i) => i.selectedDate))].join(", ")}
              </SummaryValue>
            </SummaryTotalRow>

            <AppButton $fullWidth $variant="primary" disabled>
              Продължи към поръчка
            </AppButton>
          </SummaryCard>
        </SummaryColumn>
      </CartContent>
    </PageContainer>
  );
};

export default CartPage;
