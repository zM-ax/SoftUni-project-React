import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.pageBackground};
  border-radius: 18px;
  padding: 1.8rem 1.6rem 1.4rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.15rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const ModalSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-bottom: 1rem;
`;

export const FieldLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 0.35rem;
  max-width: 100%;
  word-break: break-word;
  white-space: pre-line;
`;

export const Textarea = styled.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box; //MIRACLE!!! Makes it stay within the container!
  display: block;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  padding: 0.6rem 0.7rem;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  word-break: break-word;
  white-space: pre-line;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}22;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 0.85rem;
  }
`;


export const ButtonsRow = styled.div`
  margin-top: 1.1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
`;

export const ErrorText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.error};
`;
