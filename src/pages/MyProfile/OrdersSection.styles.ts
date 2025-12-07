import styled from "styled-components";
import type { OrderStatus } from "../../types/orders";

export const OrdersSection = styled.section`
  background: ${({ theme }) => theme.colors.authBg || theme.colors.cardBackground};
  border-radius: 18px;
  padding: 2.1rem 2rem 2rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  margin: 0 auto;
  max-width: 600px;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 600px) {
    padding: 1.2rem 0.9rem 1.2rem;
    min-height: 120px;
  }
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const InfoText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-bottom: 0.9rem;
  text-align: center;
`;

export const ErrorText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.errorText};
  background: ${({ theme }) => theme.colors.errorBg};
  border: 1px solid ${({ theme }) => theme.colors.errorBorder};
  border-radius: 10px;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.9rem;
`;

export const OrdersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const OrderCard = styled.li`
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  background: ${({ theme }) => theme.colors.pageBackground};
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  font-size: 0.9rem;
`;

export const OrderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
  gap: 0.5rem;
`;

export const OrderDate = styled.span`
  font-weight: 600;
`;

export const OrderStatusBadge = styled.span<{ $status: OrderStatus }>`
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  ${({ theme, $status }) => {
    switch ($status) {
      case "pending":
        return `
          background: rgba(222, 160, 85, 0.13);
          color: ${theme.colors.primary};
        `;
      case "confirmed":
      case "in_progress":
        return `
          background: rgba(46, 125, 50, 0.12);
          color: ${theme.colors.success};
        `;
      case "completed":
        return `
          background: rgba(46, 125, 50, 0.18);
          color: ${theme.colors.success};
        `;
      case "cancelled":
      default:
        return `
          background: ${theme.colors.errorBg};
          color: ${theme.colors.error};
        `;
    }
  }}
`;

export const OrderMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const OrderPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  font-weight: 600;
`;

export const OrderTotal = styled.span`
  font-weight: 700;
`;

export const ItemsPreview = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const LoadingText = styled.p`
  font-size: 0.9rem;
  text-align: center;
`;