import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Паролата трябва да е поне 8 символа.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Паролите не съвпадат.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      // displayName in Auth
      if (form.name.trim()) {
        await updateProfile(user, {
          displayName: form.name.trim(),
        });
      }

      // Document in Firestore /users/{uid}
      await createUserProfile({
        uid: user.uid,
        name: form.name,
        email: form.email,
      });

      // redirect
      navigate("/");
    } catch (err: unknown) {
      console.error(err);

      if (typeof err === "object" && err !== null && "code" in err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const code = (err as any).code as string;

        if (code === "auth/email-already-in-use") {
          setError("Този имейл вече има регистриран профил.");
        } else if (code === "auth/invalid-email") {
          setError("Моля, въведи валиден имейл.");
        } else if (code === "auth/weak-password") {
          setError("Паролата е твърде слаба.");
        } else {
          setError("Нещо се обърка. Опитай отново.");
        }
      } else {
        setError("Нещо се обърка. Опитай отново.");
      }
    } finally {
      setIsSubmitting(false);
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

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name">Име</Label>
          <AppInput
            id="name"
            type="text"
            placeholder="Твоето име"
            value={form.name}
            onChange={handleChange}
            required
            $width="100%"
          />
        </Field>

        <Field>
          <Label htmlFor="email">Имейл</Label>
          <AppInput
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="password">Парола</Label>
          <AppInput
            id="password"
            type="password"
            placeholder="Минимум 8 символа"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="confirmPassword">Повтори паролата</Label>
          <AppInput
            id="confirmPassword"
            type="password"
            placeholder="Повтори паролата"
            value={form.confirmPassword}
            onChange={handleChange}
            required            
          />
        </Field>

        {error && <ErrorText>{error}</ErrorText>}

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
