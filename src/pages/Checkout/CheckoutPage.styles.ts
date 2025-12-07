import styled from "styled-components";
import { AppButton } from "../../styles/AppButton"; 

export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  align-items: flex-start;

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const FormCard = styled.section`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 14px;
  padding: 1.4rem 1.2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
`;

export const SummaryCard = styled.aside`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 14px;
  padding: 1.4rem 1.2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 1.5rem;

  @media ${({ theme }) => theme.devices.tablet} {
    position: static;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 0.9rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.9rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const Input = styled.input`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.body};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
    opacity: 1;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const Textarea = styled.textarea`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.body};
  outline: none;
  min-height: 70px;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
    opacity: 1;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const RadioRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.9rem;
  flex-wrap: wrap;
`;

export const RadioOption = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.error};
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.4rem;
  
`;

export const SummaryLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-right: 0.5rem;
`;

export const SummaryValue = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
`;

export const SummaryTotalRow = styled(SummaryRow)`
  margin-top: 0.7rem;
  padding-top: 0.7rem;
  border-top: 1px solid ${({ theme }) => theme.colors.headerBorder};

  ${SummaryLabel} {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  ${SummaryValue} {
    font-size: 1.05rem;
    font-weight: 700;
  }
`;

export const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.7rem 0 0.8rem;
  max-height: 180px;
  overflow: auto;
`;

export const ItemRow = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
`;

export const GroupTitle = styled.p`
  margin: 0.6rem 0 0.2rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoText = styled.p`
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const EmptyCartText = styled.p`
  font-size: 0.95rem;
`;

export const PageHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;

  /* На мобилни: бутонът отгоре, заглавието отдолу */
  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 0.25rem;
  }

  /* На таблет: бутонът и заглавието са един под друг */
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
  }
`;

export const BackButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  @media ${({ theme }) => theme.devices.mobile} {
    position: static;
    transform: none;
    align-self: flex-start;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    position: static;
    transform: none;
    align-self: flex-start;
    margin-bottom: 0.2rem;
  }
`;

/* Преизползваме AppButton, но го настройваме за back-link */
export const BackButton = styled(AppButton)`
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  font-size: 1rem;
  box-shadow: none;

  

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 0.95rem;
    padding-left: 0;
    padding-right: 0;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 1rem;
    padding-left: 0;
    padding-right: 0;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover { 
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;