export const BoxInfo = styled.div`
  font-size: 0.95em;
 
  margin-top: 2px;
`;
import styled from "styled-components";

export const DessertsPageWrapper = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.5rem 1rem 2.5rem;
  }
`;

export const Section = styled.section`
  & + & {
    margin-top: 3rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.4rem;
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 1.6rem;
  }
`;

export const ProductCard = styled.article`
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.buttonBackground || "rgba(255,255,255,0.95)"};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.2);
  }
`;

export const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%; /* 4:3 съотношение */
  overflow: hidden;
`;

export const ProductImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProductContent = styled.div`
  padding: 0.9rem 1rem 1.1rem;
  text-align: center;
`;

export const ProductTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
`;

export const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  font-size: 0.95rem;
`;

export const PriceMain = styled.span`
  font-weight: 600;
`;

export const PriceSecondary = styled.span`
  opacity: 0.85;
  font-size: 0.9rem;
`;

export const Message = styled.p`
  margin-top: 1rem;
`;
