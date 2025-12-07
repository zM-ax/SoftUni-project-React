import styled from "styled-components";

// export const DetailsWrapper = styled.main`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 2rem 1.5rem 3rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   background: ${({ theme }) => theme.colors.pageBackground};

//   @media ${({ theme }) => theme.devices.mobile} {
//     padding: 1.5rem 1rem 2.5rem;
//   }
// `;

export const DetailsWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.pageBackground};

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.5rem 1rem 2.5rem;
  }
`;

export const TopSection = styled.section`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: flex-start;

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.8rem;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;


export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  width: 100%;
  max-width: 640px;
  box-sizing: border-box;

  text-align: left;
  padding: 1.4rem 1.6rem;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.mutedBackground};
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);

  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
    margin: 0 auto;
    padding: 1.2rem 1.2rem;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  border-radius: 18px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.mutedBackground};
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const GalleryGrid = styled.div`
  margin-top: 0.6rem;
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 600px;
  overflow-x: auto;
`;

export const GalleryImage = styled.img`
  flex: 0 0 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.colors.headerBorder};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Title = styled.h1`
  font-size: 1.7rem;
  margin-bottom: 0.3rem;
  font-family: ${({ theme }) => theme.fonts.titles};
  color: ${({ theme }) => theme.colors.text};
`;

export const SubTitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: ${({ theme }) => theme.fonts.descriptions};
  margin-bottom: 0.4rem;
`; 

export const InfoRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const PriceMain = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const MetaItem = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const QuantityRow = styled.div`
  margin-top: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-wrap: wrap;
  }
`;

export const QuantityLabel = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const QuantityButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.25rem 0.7rem;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.buttonBackground};
  transition: background 0.15s ease, border-color 0.15s ease;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.mutedBackground};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
    background: ${({ theme }) => theme.colors.inputBackground};
  }
`;

export const QuantityValue = styled.span`
  padding: 0.2rem 0.9rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const DateLabel = styled.label`
  margin-top: 1rem;
  display: block;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DateInput = styled.select`
  width: 100%;
  margin-top: 0.3rem;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  font-size: 0.95rem;
  font-family: ${({ theme }) => theme.fonts.body};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
`;

export const AddToCartButton = styled.button`
  margin-top: 1.1rem;
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: background 0.15s ease, transform 0.05s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    transform: none;
  }
`;

/* ---- Back button & messages ---- */

export const BackButton = styled.button`
  align-self: flex-start;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;

  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Message = styled.p`
  padding: 3rem 0 1rem;
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

/* ---- Accordion ---- */

export const AccordionsSection = styled.section`
  margin-top: 2rem;
  max-width: 800px;
`;

export const AccordionItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
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
  font-family: ${({ theme }) => theme.fonts.body};

  appearance: none;
  outline: none !important;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const AccordionTitle = styled.span``;

export const AccordionBody = styled.div`
  padding: 0 0.2rem 0.8rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;
