import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthWrapper = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  min-height: calc(100vh - 4.5rem);
  background: ${({ theme }) => theme.colors.pageBackground};

  display: flex;
  flex-direction: column; /* важно */
  align-items: center;
  justify-content: center;
  padding: 5.5rem 1rem 3rem;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 4.5rem 1rem 3rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 4rem 0.75rem 2.5rem;
  }
`;

const AuthLayout = () => {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
};

export default AuthLayout;
