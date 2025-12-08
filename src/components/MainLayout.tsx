import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

type MainLayoutProps = {
  variant?: "default" | "home";
};

const MainWrapper = styled.div<{ $variant?: "default" | "home" }>`
  min-height: 100vh;
 
  background: ${({ theme, $variant }) =>
    $variant === "home" ? theme.colors.heroBg : theme.colors.pageBackground};
  color: ${({ theme }) => theme.colors.text};
  transition: background 0.25s ease, color 0.25s ease;

  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainLayout = ({ variant = "default" }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <MainWrapper $variant={variant}>
        <Outlet />
      </MainWrapper>
    </>
  );
};

export default MainLayout;
