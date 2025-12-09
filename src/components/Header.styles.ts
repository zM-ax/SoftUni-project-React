import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrapperStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: ${({ theme }) => theme.colors.headerBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: padding 0.2s, background 0.25s ease, border-color 0.25s ease;
`;

export const NavStyled = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0 0.75rem;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DesktopLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-left: 2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;

  @media ${({ theme }) => theme.devices.mobile} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.colors.headerBorder};
    border-radius: 999px;
    background: transparent;
    padding: 0.2rem 0.6rem;
    font-size: 0.9rem;
    cursor: pointer;
    margin-left: 0.75rem;
  }
`;

export const StyledLinkStyled = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.navigation};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HeaderLogoStyled = styled.img`
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

export const SpacerStyled = styled.div`
  flex: 1;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ThemeToggleStyled = styled.button`
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: transparent;
  font-size: 0.8rem;
  padding: 0.2rem 0.75rem;
  cursor: pointer;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 0.75rem;
    padding: 0.15rem 0.55rem;
  }
`;

export const CartWrapperStyled = styled.div`
  position: relative;
  margin-left: 0.5rem;
  margin-top: 0.2rem;
`;

export const CartBadgeStyled = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.headerBg};
`;

export const CartIconStyled = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.6);
  }

  @media ${({ theme }) => theme.devices.desktop} {
    width: 40px;
    height: 40px;
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media ${({ theme }) => theme.devices.mobile} {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.6rem 0.9rem 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
    background: ${({ theme }) => theme.colors.headerBg};
  }
`;

export const MobileMenuLink = styled(StyledLinkStyled)`
  font-size: 0.95rem;
`;
