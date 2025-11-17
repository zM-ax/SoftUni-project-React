import styled from "styled-components";
import headerLogo from "../../assets/images/Logo_400_300.png";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 72px); // Account for header height
  padding: 2rem 1rem;
  text-align: center;
  gap: 2rem;
`;

const TitleStyled = styled.h1`
  font-family: ${({ theme }) => theme.fonts.titles};
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: ${({ theme }) => theme.colors.pageBackground};
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubtitleStyled = styled.p`
  font-family: ${({ theme }) => theme.fonts.descriptions};
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: ${({ theme }) => theme.colors.pageBackground};
  opacity: 0.8;
  max-width: 600px;
  line-height: 1.6;
`;

const ImageTitleStyled = styled.img`
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
    max-height: 225px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    max-width: 250px;
    max-height: 187px;
  }
`;

const HomePage = () => {
  return (
    <HomeContainer> 
        <ImageTitleStyled
          src={headerLogo}
          alt="Български десерти - Две шепи брашно"
        /> 
      <TitleStyled>Две шепи брашно</TitleStyled>

      <SubtitleStyled>
        Автентични български десерти, приготвени с любов и традиционни рецепти
        от детството ни
      </SubtitleStyled>
    </HomeContainer>
  );
};

export default HomePage;
