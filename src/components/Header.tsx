import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useThemeMode } from "../context/useThemeMode";

const HeaderWrapperStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  background: ${({ theme }) => theme.colors.headerBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: padding 0.2s, background 0.25s ease, border-color 0.25s ease;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 0.5rem 0.5rem;
  }

  @media ${({ theme }) => theme.devices.desktop} {
    padding: 1rem 0;
  }
`;

const NavStyled = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 0.75rem;
    font-size: 0.9rem;
  }
`;

const StyledLinkStyled = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.navigation};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HeaderLogoStyled = styled.img`
  height: 40px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
  transition: filter 0.2s, transform 0.2s;

  &:hover {
    filter: brightness(1.1);
    transform: scale(1.02);
  }

  @media ${({ theme }) => theme.devices.tablet} {
    height: 35px;
    max-width: 130px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    height: 30px;
    max-width: 100px;
  }
`;

const CartIconStyled = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: filter 0.2s;
  margin-left: 1rem;
  &:hover {
    filter: brightness(1.6);
  }
`;

const SpacerStyled = styled.div`
  flex: 1;
`;

const ThemeToggleStyled = styled.button`
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: transparent;
  font-size: 0.8rem;
  padding: 0.2rem 0.75rem;
  cursor: pointer;
  margin-left: 1rem;
`;

const ProfileImgStyled = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 1rem;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.pageBackground};

  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
`;

const Header = () => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();
  // logo_120_40_light
  return (
    <HeaderWrapperStyled>
      <NavStyled>
        <StyledLinkStyled to="/">
          <HeaderLogoStyled
            src={
              mode === "dark"
                ? "../../src/assets/images/logo_120_40_light.png"
                : "../../src/assets/images/logo_120_40_dark.png"
            }
            alt="Две шепи брашно"
            title="Начало"
          />
        </StyledLinkStyled>
        <StyledLinkStyled to="/deserts">Десерти</StyledLinkStyled>
        <StyledLinkStyled to="/diy">Направи си сам</StyledLinkStyled>
        <StyledLinkStyled to="/faq">FAQ</StyledLinkStyled>
        <StyledLinkStyled to="/contacts">Контакти</StyledLinkStyled>

        <SpacerStyled />

        <ThemeToggleStyled onClick={toggleMode}>
          {mode === "light" ? "Dark 🌙" : "Light ☀️"}
        </ThemeToggleStyled>

        <CartIconStyled
          src={
            mode === "dark"
              ? "../../src/assets/images/cart_image_light.png"
              : "../../src/assets/images/cart_image_dark.png"
          }
          alt="Количка"
          title="Количка"
          onClick={() => navigate("/cart")}
        />

        <ProfileImgStyled
          src={
            mode === "dark"
              ? "../../src/assets/images/profile_image_light.png"
              : "../../src/assets/images/profile_image_dark.png"
          }
          alt="Профил"
          title="Вход / Профил"
          onClick={() => navigate("/login")}
        />
      </NavStyled>
    </HeaderWrapperStyled>
  );
};

export default Header;
