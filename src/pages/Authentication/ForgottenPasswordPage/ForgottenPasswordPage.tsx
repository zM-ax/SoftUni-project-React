import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { AuthForm as Form } from "../../../styles/AuthForm";
import {
  AuthCloseButton as CloseButton,
  AuthTitle as Title,
  AuthSubtitle as Subtitle,
  AuthLabel as Label,
  AuthHelperRow as HelperRow,
  AuthSmallNote as SmallNote,
} from "../../../styles/AuthShared";
import { AuthField as Field } from "../../../styles/AuthField";
import { AuthCard } from "../../../styles/AuthCard";
import { AppButton } from "../../../styles/AppButton";
import { AppInput } from "../../../components/AppInput";



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
