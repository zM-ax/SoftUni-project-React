import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthForm as Form } from "../../../styles/AuthForm";
import {
  AuthCloseButton as CloseButton,
  AuthTitle as Title,
  AuthSubtitle as Subtitle,
  AuthLabel as Label,
  AuthHelperRow as HelperRow,
  AuthSmallNote as SmallNote,
  AuthErrorText as ErrorText,
} from "../../../styles/AppShared";
import { AuthField as Field } from "../../../styles/AppInputField";
import { AuthCard } from "../../../styles/AuthCard";
import { AppInput } from "../../../components/AppInput";
import { AppButton } from "../../../styles/AppButton";
import { useLogin } from "../../../hooks/useLogin";
import { useAppSelector } from "../../../store/hooks";

import { loginSchema, type LoginFormValues } from "./login.schema";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, setError } = useLogin();
  const user = useAppSelector((state) => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    // чистим server-side грешката преди нов опит
    if (error) setError(null);

    try {
      await login(data.email.trim(), data.password);
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const emailRegister = register("email");
  const passwordRegister = register("password");

  return (
    <AuthCard onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={handleClose} aria-label="Затвори">
        ✕
      </CloseButton>
      <Title>Вход</Title>
      <Subtitle>Влез в профила си, за да поръчаш любимите десерти.</Subtitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label htmlFor="email">Имейл</Label>
          <AppInput
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={loading || isSubmitting}
            {...emailRegister}
            onChange={(e) => {
              emailRegister.onChange(e);
              if (error) setError(null);
            }}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="password">Парола</Label>
          <AppInput
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={loading || isSubmitting}
            {...passwordRegister}
            onChange={(e) => {
              passwordRegister.onChange(e);
              if (error) setError(null);
            }}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </Field>

        {error && <ErrorText>{error}</ErrorText>}

        <AppButton
          $fullWidth
          $marginTop="1.5rem"
          type="submit"
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? "Влизане..." : "Вход"}
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
