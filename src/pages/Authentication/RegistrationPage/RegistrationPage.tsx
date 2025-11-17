import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppButton } from "../../../components/AppButton";

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
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

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: register logic (API call, redirect)
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Card onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={handleClose} aria-label="Затвори">
        ✕
      </CloseButton>

      <Title>Регистрация</Title>
      <Subtitle>
        Създай профил и запази любимите си кутии с десерти от детството.
      </Subtitle>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name">Име</Label>
          <Input id="name" type="text" placeholder="Твоето име" required />
        </Field>

        <Field>
          <Label htmlFor="email">Имейл</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </Field>

        <Field>
          <Label htmlFor="password">Парола</Label>
          <Input
            id="password"
            type="password"
            placeholder="Минимум 8 символа"
            required
          />
        </Field>

        <Field>
          <Label htmlFor="confirmPassword">Повтори паролата</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Повтори паролата"
            required
          />
        </Field>

        <AppButton fullWidth marginTop="1.5rem">Създай профил</AppButton>
      </Form>

      <HelperRow>
        <span style={{ fontSize: "0.9rem", color: "#777" }}>
          Вече имаш профил?
        </span>
        <AppButton variant="text" onClick={() => navigate("/login")}>
          Влез тук
        </AppButton>
      </HelperRow>

      <SmallNote>
        С профил в Две шепи брашно по-лесно следиш поръчките и запазваш любими
        комбинации 💛
      </SmallNote>
    </Card>
  );
};

export default RegisterPage;
