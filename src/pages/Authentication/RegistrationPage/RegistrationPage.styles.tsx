import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 18px;
  padding: 2.2rem 2rem 1.8rem;
  box-shadow: 0 16px 40px ${({ theme }) => theme.colors.buttonBackground || 'rgba(0,0,0,0.18)'};

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.8rem 1.4rem 1.6rem;
  }
`;

export const CloseButton = styled.button`
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

export const Title = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.titles};
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.descriptions};
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-width: 94%;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const Input = styled.input`
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  padding: 0.55rem 0.9rem;
  font-size: 0.95rem;
  font-family: ${({ theme }) => theme.fonts.body};
  background: ${({ theme }) => theme.mode === 'dark' ? '#392414' : theme.colors.inputBackground};
  color: ${({ theme }) => theme.mode === 'dark' ? '#fffaf3' : theme.colors.text};
  transition: border-color 0.18s, box-shadow 0.18s;

  &::placeholder {
    color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.textSecondary : theme.colors.buttonBackground};
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.2);
  }
`;

export const HelperRow = styled.div`
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

export const SmallNote = styled.p`
  margin-top: 1.4rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.descriptions};
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error || '#d32f2f'};
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;
