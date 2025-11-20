import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthCard } from "../../../components/AuthCard";
import { AppButton } from "../../../components/AppButton";
import { AppInput } from "../../../components/AppInput";


const CloseButton = styled.button`
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  cursor: pointer;
  line-height: 1;
  color: #999;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.titles};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.descriptions};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-width: 93%;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #555;
  font-family: ${({ theme }) => theme.fonts.body};
`;

const HelperRow = styled.div`
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

const SmallNote = styled.p`
  margin-top: 1.4rem;
  font-size: 0.82rem;
  color: #999;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.descriptions};
`;

const ForgottenPasswordPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: send reset link (API call)
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <AuthCard onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={handleClose} aria-label="Затвори">
        ✕
      </CloseButton>

      <Title>Забравена парола</Title>
      <Subtitle>
        Въведи имейла си и ще ти изпратим линк за създаване на нова парола.
      </Subtitle>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="email">Имейл</Label>
          <AppInput
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </Field>

        <AppButton $fullWidth>Изпрати линк за нова парола</AppButton>
      </Form>

      <HelperRow>
        <AppButton $variant="text" onClick={() => navigate("/login")}>
          Спомни си паролата? Вход
        </AppButton>
        <AppButton $variant="text" onClick={() => navigate("/register")}>
          Нямаш профил? Регистрирай се
        </AppButton>
      </HelperRow>

      <SmallNote>
        Ако не получиш имейл до няколко минути, провери и в папка
        &quot;Спам&quot; или &quot;Промоции&quot;.
      </SmallNote>
    </AuthCard>
  );
};

export default ForgottenPasswordPage;
