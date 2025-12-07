import styled from "styled-components";

export const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.1rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1.8rem;
  }
`;

export const PageSubtitle = styled.p`
  text-align: center;
  max-width: 620px;
  margin: 0 auto 2.5rem;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 0.98rem;
  line-height: 1.6;
`;

export const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 2rem;

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const ContactInfo = styled.aside`
  background: ${({ theme }) => theme.colors.mutedBackground};
  border-radius: 18px;
  padding: 1.8rem 1.9rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
  color: ${({ theme }) => theme.colors.text};

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.5rem 1.4rem;
  }
`;

export const InfoTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
`;

export const InfoText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-bottom: 1rem;
`;

export const InfoItem = styled.div`
  margin-top: 1.1rem;
`;

export const InfoLabel = styled.div`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-bottom: 0.1rem;
`;

export const InfoValue = styled.div`
  font-size: 0.98rem;
  font-weight: 500;
`;

export const FormCard = styled.form`
  background: ${({ theme }) => theme.colors.cardBackground || "#ffffff"};
  border-radius: 20px;
  padding: 2.1rem 2.4rem 2.2rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.7rem 1.4rem 1.8rem;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.1rem;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: column;
    gap: 0.9rem;
  }
`;

export const HalfField = styled.div`
  flex: 1 1 0;
`;

export const FullField = styled.div`
  margin-top: 0.4rem;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  resize: vertical;
  border-radius: 14px;
  border: 1px solid
    ${({ theme }) => theme.colors.headerBorder || "rgba(0, 0, 0, 0.12)"};
  padding: 0.85rem 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  line-height: 1.5;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    background 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(183, 127, 57, 0.2);
    background: ${({ theme }) => theme.colors.pageBackground};
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 0.7rem 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    background 0.15s ease;
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(183, 127, 57, 0.2);
    background: ${({ theme }) => theme.colors.pageBackground};
  }

  /* Стилизираме dropdown-а */
  option {
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.pageBackground};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.6rem;
  }

  /* Custom hover за Chrome / Edge / Opera */
  option:hover {
    background: ${({ theme }) => theme.colors.mutedBackground};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const HelperText = styled.p`
  margin-top: 0.35rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const ButtonRow = styled.div`
  margin-top: 1.6rem;
  display: flex;
  justify-content: flex-end;
`;

export const SuccessMessage = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  background: ${({ theme }) =>
    theme.colors.success
      ? "rgba(46, 125, 50, 0.08)"
      : "rgba(46, 125, 50, 0.08)"};
  color: ${({ theme }) => theme.colors.success || "#2e7d32"};
`;

export const ErrorMessage = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  background: ${({ theme }) =>
    theme.colors.errorBg || "rgba(183, 28, 28, 0.04)"};
  color: ${({ theme }) => theme.colors.errorText || "#5b2525"};
  border: 1px solid
    ${({ theme }) => theme.colors.errorBorder || "rgba(183, 28, 28, 0.3)"};
`;
