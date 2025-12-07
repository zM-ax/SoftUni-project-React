import styled from "styled-components";

export const PageContainer = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  margin-top: 3rem;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 2rem 1.5rem 3.5rem;
  }
`;

export const CartTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

/* Layout */

export const CartContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  align-items: flex-start;

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const ItemsColumn = styled.section`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 14px;
  padding: 1.2rem 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1rem 0.8rem;
  }
`;

export const SummaryColumn = styled.aside`
  @media ${({ theme }) => theme.devices.tablet} {
    order: -1;
  }
`;

/* Empty state */

export const EmptyCartWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
  padding: 2.5rem 1.5rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.mutedBackground};
`;

export const EmptyCartText = styled.p`
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

/* Header row */

export const CartHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.8fr 1.3fr 1.4fr;
  column-gap: 0.75rem;
  padding: 0.4rem 0.4rem 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

export const HeaderLabel = styled.span<{
  $align?: "left" | "center" | "right";
}>`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: ${({ $align }) => $align || "center"};
`;

/* Cart item row */

export const CartItemRow = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1.8fr 1.3fr 1.4fr;
  column-gap: 0.75rem;
  align-items: center;
  padding: 0.9rem 0.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};

  &:last-of-type {
    border-bottom: none;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    grid-template-columns: 1fr;
    row-gap: 0.6rem;
    padding: 0.9rem 0.2rem 1.2rem;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ItemImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ItemTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const ItemTitle = styled.h2`
  font-size: 0.98rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const ItemMeta = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

/* Quantity */

export const QuantityWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  @media ${({ theme }) => theme.devices.mobile} {
    justify-content: flex-start;
  }
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: ${({ theme }) => theme.colors.inputBackground};
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const QuantityValue = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: 0.95rem;
`;

/* Price cells */

export const PriceCell = styled.div`
  font-size: 0.92rem;
  text-align: center;

  @media ${({ theme }) => theme.devices.mobile} {
    text-align: left;
  }
`;

export const SubtotalCell = styled.div`
  font-size: 0.98rem;
  font-weight: 600;
  text-align: center;

  @media ${({ theme }) => theme.devices.mobile} {
    text-align: left;
  }
`;

/* Summary card */

export const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 14px;
  padding: 1.4rem 1.2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 1.5rem;

  @media ${({ theme }) => theme.devices.tablet} {
    position: static;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.6rem;
`;

export const SummaryLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const SummaryValue = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
`;

export const SummaryTotalRow = styled(SummaryRow)`
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid ${({ theme }) => theme.colors.headerBorder};

  ${SummaryLabel} {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  ${SummaryValue} {
    font-size: 1.05rem;
    font-weight: 700;
  }
`;
