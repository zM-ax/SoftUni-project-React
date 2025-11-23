export const TabsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const LogoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.4rem;
`;
import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 880px;
  margin: 2.4rem auto 3rem;
  padding: 0 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.pageBackground};
`;
