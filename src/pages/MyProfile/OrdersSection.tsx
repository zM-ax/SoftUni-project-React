import styled from "styled-components";

const OrdersSection = styled.section`
  background: ${({ theme }) => theme.colors.authBg || theme.colors.pageBackground};
  border-radius: 18px;
  padding: 2.1rem 2rem 2rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  margin: 0 auto;
  max-width: 600px;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 600px) {
    padding: 1.2rem 0.7rem 1.2rem;
    min-height: 120px;
  }
`; 

const OrdersSectionComponent = () => (
  <OrdersSection>
    <h2>Поръчки</h2>
    <p>Тук ще се визуализират поръчките ти.</p>
  </OrdersSection>
);

export default OrdersSectionComponent;
