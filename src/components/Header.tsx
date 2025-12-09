import {
  HeaderWrapperStyled,
  NavStyled,
  LeftSection,
  DesktopLinks,
  MobileMenuButton,
  StyledLinkStyled,
  HeaderLogoStyled,
  SpacerStyled,
  RightSection,
  ThemeToggleStyled,
  CartWrapperStyled,
  CartBadgeStyled,
  CartIconStyled,
  MobileMenu,
  MobileMenuLink,
} from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../context/useThemeMode";
import HeaderProfileIcon from "./HeaderProfileIcon";
import { useAppSelector } from "../store/hooks";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const userRedux = useAppSelector((state) => state.user.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (to: string) => {
    navigate(to);
    setIsMobileMenuOpen(false); // close the menu on mobile
  };

  return (
    <>
      <HeaderWrapperStyled>
        <NavStyled>
          {/* LEFT: Logo + (mobile) burger button */}
          <LeftSection>
            <StyledLinkStyled to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <HeaderLogoStyled
                src={
                  mode === "dark"
                    ? "../../src/assets/images/logo_120_40_light.png"
                    : "../../src/assets/images/logo_120_40_dark.png"
                }
                alt="Две шепи брашно"
                title="Начало"
                className="fade-in"
              />
            </StyledLinkStyled>

            <DesktopLinks>
              <StyledLinkStyled to="/products">Десерти</StyledLinkStyled>
              <StyledLinkStyled to="/diy">Направи си сам</StyledLinkStyled>
              <StyledLinkStyled to="/faq">FAQ</StyledLinkStyled>
              <StyledLinkStyled to="/contacts">Контакти</StyledLinkStyled>
              {userRedux?.userType === "admin" && (
                <StyledLinkStyled to="/admin">Админ</StyledLinkStyled>
              )}
            </DesktopLinks>

            <MobileMenuButton
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </MobileMenuButton>
          </LeftSection>

          <SpacerStyled />

          {/* RIGHT: theme toggle, cart, profile */}
          <RightSection>
            <ThemeToggleStyled onClick={toggleMode}>
              {mode === "light" ? "Dark 🌙" : "Light ☀️"}
            </ThemeToggleStyled>

            <CartWrapperStyled>
              <CartIconStyled
                src={
                  mode === "dark"
                    ? "../../src/assets/images/cart_image_light.png"
                    : "../../src/assets/images/cart_image_dark.png"
                }
                alt="Количка"
                title="Количка"
                onClick={() => handleNavClick("/cart")}
              />

              {cartCount > 0 && (
                <CartBadgeStyled>
                  {cartCount > 99 ? "99+" : cartCount}
                </CartBadgeStyled>
              )}
            </CartWrapperStyled>

            <HeaderProfileIcon />
          </RightSection>
        </NavStyled>
      </HeaderWrapperStyled>

      {/* MOBILE MENU – under the header */}
      <MobileMenu $open={isMobileMenuOpen}>
        <MobileMenuLink
          to="/products"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Десерти
        </MobileMenuLink>
        <MobileMenuLink to="/diy" onClick={() => setIsMobileMenuOpen(false)}>
          Направи си сам
        </MobileMenuLink>
        <MobileMenuLink to="/faq" onClick={() => setIsMobileMenuOpen(false)}>
          FAQ
        </MobileMenuLink>
        <MobileMenuLink
          to="/contacts"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Контакти
        </MobileMenuLink>
        {userRedux?.userType === "admin" && (
          <MobileMenuLink
            to="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Админ
          </MobileMenuLink>
        )}
      </MobileMenu>
    </>
  );
};

export default Header;
