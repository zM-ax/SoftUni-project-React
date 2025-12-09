import styled from "styled-components";

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.7rem;
  position: relative;
  background: ${({ theme }) => theme.colors.cardBackground};

  > button {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    font-family: ${({ theme }) => theme.fonts.navigation};
  }

  > h1 {
    flex: 1;
    text-align: center;
    margin: 0;
    color: ${({ theme }) => theme.colors.primaryDark || theme.colors.buttonBackground};
    font-family: ${({ theme }) => theme.fonts.titles};
  }
`;

export const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.pageBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

export const InfoText = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.descriptions};
`;

export const PageTitle = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.pageBackground};

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 1.3rem;
  }
`;