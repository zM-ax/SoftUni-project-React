import styled from "styled-components";

export const DateSection = styled.div`
  margin-top: 1.5rem;
`;

export const DateLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const DateHelper = styled.p`
  margin: 0.3rem 0 0.7rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.mutedText || "#c3b9aa"};
`;

export const DateFieldButton = styled.button`
  margin-top: 0.2rem;
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
  cursor: pointer;

  span {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DatePlaceholder = styled.span`
  color: ${({ theme }) => theme.colors.mutedText || "#a18f7c"};
`;

export const DateFieldValue = styled.span``;

export const DateError = styled.p`
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.error || "#ffb3a6"};
`;

/* --- Modal --- */

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  width: min(480px, 92vw);
  max-height: 80vh;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* малко tune за вътрешния DayPicker */
  .rdp {
    --rdp-accent-color: ${({ theme }) => theme.colors.primary};
    --rdp-background-color: ${({ theme }) =>
      theme.colors.mutedBackground || "#2b1b10"};
    --rdp-accent-color-dark: ${({ theme }) => theme.colors.primaryDark || "#b88050"};
    --rdp-outline: 2px solid ${({ theme }) => theme.colors.primary};
    --rdp-outline-selected: 2px solid ${({ theme }) => theme.colors.primary};

    color: ${({ theme }) => theme.colors.text};
  }

  .rdp-day_selected,
  .rdp-day_selected:focus-visible,
  .rdp-day_selected:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.buttonText || "#ffffff"};
  }

  .rdp-day_today:not(.rdp-day_selected) {
    border: 1px dashed ${({ theme }) => theme.colors.primary};
  }
`;

export const ModalHeader = styled.div`
  padding: 1rem 1.3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`; 

export const ModalBody = styled.div`
  padding: 0.8rem 1.3rem 1rem;
  overflow-y: auto;
`;
