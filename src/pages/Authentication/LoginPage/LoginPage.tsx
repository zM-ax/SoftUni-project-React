import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm as Form } from "../../../styles/AuthForm";
import {
  AuthCloseButton as CloseButton,
  AuthTitle as Title,
  AuthSubtitle as Subtitle,
  AuthLabel as Label,
  AuthHelperRow as HelperRow,
  AuthSmallNote as SmallNote,
} from "../../../styles/AppShared";
import { AuthField as Field } from "../../../styles/AppInputField";
import { AuthCard } from "../../../styles/AuthCard";
import { AppInput } from "../../../components/AppInput";
import { AppButton } from "../../../styles/AppButton";
import { useLogin } from "../../../hooks/useLogin";


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, setError } = useLogin();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/profile");
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <AuthCard onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={handleClose} aria-label="Затвори">
        ✕
      </CloseButton>
      <Title>Вход</Title>
      <Subtitle>Влез в профила си, за да поръчаш любимите десерти.</Subtitle>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="email">Имейл</Label>
          <AppInput
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            disabled={loading}
          />
        </Field>

        <Field>
          <Label htmlFor="password">Парола</Label>
          <AppInput
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            disabled={loading}
          />
        </Field>

        {error && (
          <div
            style={{
              color: "#d32f2f",
              textAlign: "center",
              marginTop: 8,
              fontSize: "0.97rem",
            }}
          >
            {error}
          </div>
        )}

        <AppButton
          $fullWidth
          $marginTop="1.5rem"
          type="submit"
          disabled={loading}
        >
          {loading ? "Влизане..." : "Вход"}
        </AppButton>
      </Form>

      <HelperRow>
        <AppButton $variant="text" onClick={() => navigate("/register")}>
          Регистрирай се
        </AppButton>
        <AppButton
          $variant="text"
          onClick={() => navigate("/forgotten-password")}
        >
          Забравена парола
        </AppButton>
      </HelperRow>

      <SmallNote>
        Създаваме профил, за да пазим твоите данни за доставка и любими кутии 💛
      </SmallNote>
    </AuthCard>
  );
};

export default LoginPage;
