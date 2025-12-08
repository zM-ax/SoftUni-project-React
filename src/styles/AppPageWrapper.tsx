import styled from "styled-components";

/**
 * Unified wrapper for all pages.
 * Use instead of main/div wrapper on each page.
 */
export const AppPageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: center;
  margin: 0 auto;
  margin-top: 4rem;
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
