import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "../../../config/firebase";
import { createUserProfile } from "../../../services/db/users";

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
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/userSlice";

import { registerSchema, type RegisterFormValues } from "./registration.schema";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      const trimmedName = data.name.trim();
      const trimmedEmail = data.email.trim();

      if (trimmedName) {
        await updateProfile(user, {
          displayName: trimmedName,
        });
      }

      await createUserProfile({
        id: user.uid,
        name: trimmedName,
        email: trimmedEmail,
        userType: "admin",
      });

      dispatch(
        setUser({
          id: user.uid,
          name: trimmedName,
          email: trimmedEmail,
          userType: "admin",
        })
      );

      navigate("/");
    } catch (err: unknown) {
      console.error(err);

      if (typeof err === "object" && err !== null && "code" in err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const code = (err as any).code as string;

        if (code === "auth/email-already-in-use") {
          setServerError("Този имейл вече има регистриран профил.");
        } else if (code === "auth/invalid-email") {
          setServerError("Моля, въведи валиден имейл.");
        } else if (code === "auth/weak-password") {
          setServerError("Паролата е твърде слаба.");
        } else {
          setServerError("Нещо се обърка. Опитай отново.");
        }
      } else {
        setServerError("Нещо се обърка. Опитай отново.");
      }
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

      <Title>Регистрация</Title>
      <Subtitle>
        Създай профил и запази любимите си кутии с десерти от детството.
      </Subtitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label htmlFor="name">Име</Label>
          <AppInput
            id="name"
            type="text"
            placeholder="Твоето име"
            autoComplete="name"
            $width="100%"
            {...register("name")}
          />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="email">Имейл</Label>
          <AppInput
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="password">Парола</Label>
          <AppInput
            id="password"
            type="password"
            placeholder="Минимум 8 символа, поне една буква и една цифра"
            autoComplete="new-password"
            {...register("password")}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="confirmPassword">Повтори паролата</Label>
          <AppInput
            id="confirmPassword"
            type="password"
            placeholder="Повтори паролата"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword.message}</ErrorText>
          )}
        </Field>

        {serverError && <ErrorText>{serverError}</ErrorText>}

        <AppButton
          $fullWidth
          $marginTop="1.5rem"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Създаване..." : "Създай профил"}
        </AppButton>
      </Form>

      <HelperRow>
        <span style={{ fontSize: "0.9rem", color: "#777" }}>
          Вече имаш профил?
        </span>
        <AppButton $variant="text" onClick={() => navigate("/login")}>
          Влез тук
        </AppButton>
      </HelperRow>

      <SmallNote>
        С профил в Две шепи брашно по-лесно следиш поръчките и запазваш любими
        комбинации 💛
      </SmallNote>
    </AuthCard>
  );
};

export default RegisterPage;
