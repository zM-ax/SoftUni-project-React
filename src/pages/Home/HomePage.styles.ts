import styled from "styled-components";

export const TitleStyled = styled.h1`
  font-family: ${({ theme }) => theme.fonts.titles};
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: ${({ theme }) => theme.colors.pageBackground};
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SubtitleStyled = styled.p`
  font-family: ${({ theme }) => theme.fonts.descriptions};
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: ${({ theme }) => theme.colors.pageBackground};
  opacity: 0.8;
  max-width: 600px;
  line-height: 1.6;
`;

export const ImageTitleStyled = styled.img`
  max-width: 400px;
  max-height: 300px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;
  background-color: ${({ theme }) => theme.colors.pageBackground};
  border-radius: 12px;
  padding: 8px;

  &:hover {
    transform: scale(1.05);
  }

  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 300px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    max-width: 250px;
  }
`;

export const Section = styled.section`
  max-width: 1100px;
  margin: 4rem auto;
  padding: 0 1rem;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.titles};
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const SectionText = styled.p`
  font-family: ${({ theme }) => theme.fonts.descriptions};
  max-width: 700px;
  margin: 0.5rem auto 2rem;
  opacity: 0.8;
  line-height: 1.6;
`;

export const AboutImage = styled.div`
  width: 100%;
  max-width: 650px;
  height: 350px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 16px;
  margin: 2rem auto 0;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);

  /* Placeholder image */
  background-image: url("https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=60");
  background-size: cover;
  background-position: center;
`;

export const DessertsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const DessertCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const DessertImage = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 12px;
  background: #f2e8da;
  margin-bottom: 0.75rem;
`;

export const StepsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const StepBox = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 14px;
  padding: 1.2rem 1rem;
  width: 240px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

export const StepNumber = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.3rem;
`;
