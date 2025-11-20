import styled from "styled-components";

export const AuthCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 18px;
  padding: 2.2rem 2rem 1.8rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  min-height: 520px; /* Match the tallest (Registration) form */
  padding-vertical: 2.5rem;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.8rem 1.4rem 1.6rem;
    min-height: 420px;
  }
`;
