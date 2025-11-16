import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"; 
import { useThemeMode } from "../context/useThemeMode";

const HeaderWrapper = styled.header`
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

const Nav = styled.nav`
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

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const ThemeToggle = styled.button`
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: transparent;
  font-size: 0.8rem;
  padding: 0.2rem 0.75rem;
  cursor: pointer;
  margin-left: 1rem;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 1rem;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: #f3f3f3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
`;

const Header = () => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();

  return (
    <HeaderWrapper>
      <Nav>
        <StyledLink to="/">Начало</StyledLink>
        <StyledLink to="/testimonials">Тестимониали</StyledLink>
        <StyledLink to="/diy">DIY</StyledLink>

        <Spacer />

        <ThemeToggle onClick={toggleMode}>
          {mode === "light" ? "Dark 🌙" : "Light ☀️"}
        </ThemeToggle>

        <ProfileImg
          src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
          alt="Профил"
          title="Вход / Профил"
          onClick={() => navigate("/login")}
        />
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
