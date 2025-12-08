import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const AdminShell = styled.div`
  margin-top: 4rem;
  text-align: center;
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.cardBackground};

  /* На по-малки екрани – sidebar отгоре, съдържание отдолу */
  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

export const Sidebar = styled.aside`
  padding: 1.5rem 1rem;
  border-right: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media ${({ theme }) => theme.devices.tablet} {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
  }
`;

export const SidebarTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 1rem;
    white-space: nowrap;
  }
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: row;
    gap: 0.6rem;
  }
`;

export const NavItem = styled(NavLink)`
  display: block;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};

  &.active {
    background: ${({ theme }) => theme.colors.mutedBackground};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media ${({ theme }) => theme.devices.tablet} {
    white-space: nowrap;
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
  }
`;

export const Main = styled.main`
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.colors.cardBackground};

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 1rem 1.25rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 1.3rem;
  }
`;
