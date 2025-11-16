import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.authBg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 1.5rem 1rem;
  }
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1rem 0.75rem;
  }
`;

const AuthLayout = () => (
  <AuthWrapper>
    <Outlet />
  </AuthWrapper>
);

export default AuthLayout;
