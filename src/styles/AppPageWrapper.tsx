import styled from "styled-components";

/**
 * Унифициран responsive wrapper за всички страници.
 * Използвай вместо main/div wrapper във всяка страница.
 */
export const AppPageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.pageBackground};

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 1.5rem 1rem 2.5rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1rem 0.5rem 2rem;
  }
`;
