import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 18px;
  padding: 2.2rem 2rem 1.8rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.8rem 1.4rem 1.6rem;
  }
`;

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
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.titles};
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
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #555;
  font-family: ${({ theme }) => theme.fonts.body};
`;

const Input = styled.input`
  border-radius: 999px;
  border: 1px solid #ddd;
  padding: 0.55rem 0.9rem;
  font-size: 0.95rem;
  font-family: ${({ theme }) => theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.2);
  }
`;

const PrimaryButton = styled.button`
  margin-top: 0.5rem;
  border-radius: 999px;
  border: none;
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: background 0.15s ease, transform 0.05s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:active {
    transform: translateY(1px);
  }
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

const TextButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-size: 0.9rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  text-underline-offset: 2px;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
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
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <Card>
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
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </Field>

        <PrimaryButton type="submit">
          Изпрати линк за нова парола
        </PrimaryButton>
      </Form>

      <HelperRow>
        <TextButton type="button" onClick={() => navigate("/login")}>
          Спомни си паролата? Вход
        </TextButton>
        <TextButton type="button" onClick={() => navigate("/register")}>
          Нямаш профил? Регистрирай се
        </TextButton>
      </HelperRow>

      <SmallNote>
        Ако не получиш имейл до няколко минути, провери и в папка
        &quot;Спам&quot; или &quot;Промоции&quot;.
      </SmallNote>
    </Card>
  );
};

export default ForgottenPasswordPage;
