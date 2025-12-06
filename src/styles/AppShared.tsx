import styled from "styled-components";

export const AuthCloseButton = styled.button`
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  cursor: pointer;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AuthTitle = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.primaryDark || theme.colors.buttonBackground};
  font-family: ${({ theme }) => theme.fonts.titles};
  text-align: center;
`;

export const AuthSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.descriptions};
  text-align: center;
`;

export const AuthHelperRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.1rem;
  gap: 0.75rem;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AuthSmallNote = styled.p`
  margin-top: 1.4rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.descriptions};
`;

export const AuthLabel = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const AuthErrorText = styled.p`
  color: #d32f2f;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;
