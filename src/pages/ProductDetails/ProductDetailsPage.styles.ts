export const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.descriptions};
  margin-bottom: 0.5rem;
  text-align: left;
`;

export const ExtraInfo = styled.p`
  font-size: 1rem;
  color: #7a6a5a;
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 0.5rem;
  text-align: left;
`;

export const BoxInfo = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const IngredientsList = styled.ul`
  list-style: disc inside;
  margin: 0.7rem 0 0.7rem 0.5rem;
  padding: 0;
  text-align: left;
`;

export const IngredientsItem = styled.li`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 0.2rem;
`;
// src/pages/ProductDetailsPage/ProductDetailsPage.styles.ts
import styled from "styled-components";

export const AccordionsSection = styled.section`
  margin-top: 2rem;
`;

export const AccordionItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  padding: 0.4rem 0;
`;

export const AccordionHeader = styled.button`
  width: 100%;
  padding: 0.9rem 0.2rem;
  background: none;
  border: none;

  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-weight: bold;

  appearance: none;

  /* remove default focus styles on all browsers */
  outline: none !important;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const AccordionBody = styled.div`
  padding: 0.6rem 0 1.2rem 0.2rem; /* Лек padding отляво */
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
`;

export const AccordionTitle = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const DetailsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
`;

export const BackButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: 1.5rem;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const TopSection = styled.section`
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  width: 100%;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const LeftColumn = styled.div`
  flex: 1.1;
  min-width: 240px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${({ theme }) => theme.devices.tablet} {
    min-width: 0;
    max-width: 100%;
    width: 100%;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  max-width: 440px;
  text-align: left;
  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-width: 240px;
  min-height: 600px;
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  background: #f7f3ef;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
    min-width: 0;
    min-height: 320px;
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 600px;
  object-fit: cover;
  display: block;
  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
    max-height: 100vw;
  }
`;

export const GalleryGrid = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
  max-width: 600px;
  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
    grid-template-columns: 1fr;
  }
`;

export const GalleryImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  display: block;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.4rem;
  text-align: left;
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.3rem;
  text-align: left;
`;

export const PriceBox = styled.div`
  padding: 1rem 1.2rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.pageBackground};
  margin-bottom: 1.4rem;
  text-align: left;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.4rem;
  text-align: left;
`;

export const PriceMain = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const PriceSecondary = styled.div`
  font-size: 0.95rem;
  opacity: 0.8;
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: 0.9rem;
  text-align: left;
`;

export const MetaItem = styled.span`
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.pageBackground};
`;

export const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.3rem 0 0.8rem;
`;

export const QuantityLabel = styled.span`
  font-size: 0.95rem;
`;

export const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: #fff;
  font-size: 1.1rem;
  cursor: pointer;
`;

export const QuantityValue = styled.span`
  min-width: 28px;
  text-align: center;
  font-weight: 500;
`;

export const DateLabel = styled.label`
  display: block;
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  margin-bottom: 1rem;
`;

export const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Message = styled.p`
  padding: 3rem 0;
  text-align: center;
`;
