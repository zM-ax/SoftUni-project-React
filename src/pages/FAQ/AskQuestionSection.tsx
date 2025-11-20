import type { FormEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import type { AskQuestionValues } from "./types";
import { AppButton } from "../../styles/AppButton";

const Wrapper = styled.section`
  margin: 2.5rem auto 0;
  max-width: 700px;
`;

const Box = styled.div`
  border-radius: 18px;
  padding: 2rem 2.25rem;
  background: ${({ theme }) => theme.colors.authBg};
  // box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.6rem 1.4rem;
  }
`;

const Title = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.fonts.titles};
  color: ${({ theme }) => theme.colors.text};
`;

const Text = styled.p`
  margin: 0 0 1.4rem;
  font-size: 0.95rem;
  font-family: ${({ theme }) => theme.fonts.descriptions};
  color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 1.2rem;

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: #555;
`;

const Input = styled.input<{ $error?: boolean }>`
  border-radius: 999px;
  border: 1px solid ${({ $error }) => ($error ? "#d9534f" : "#ddd")};
  padding: 0.55rem 0.9rem;
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${({ $error, theme }) =>
      $error ? "#d9534f" : theme.colors.primary};
    box-shadow: ${({ $error }) =>
      $error
        ? "0 0 0 2px rgba(217,83,79,0.25)"
        : "0 0 0 2px rgba(230,126,34,0.2)"};
  }
`;

const Textarea = styled.textarea<{ $error?: boolean }>`
  grid-column: 1 / -1;
  min-height: 90px;
  border-radius: 16px;
  border: 1px solid ${({ $error }) => ($error ? "#d9534f" : "#ddd")};
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.body};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ $error, theme }) =>
      $error ? "#d9534f" : theme.colors.primary};
    box-shadow: ${({ $error }) =>
      $error
        ? "0 0 0 2px rgba(217,83,79,0.25)"
        : "0 0 0 2px rgba(230,126,34,0.2)"};
  }
`;

const SubmitRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.4rem;
`;

const ErrorText = styled.div`
  font-size: 0.8rem;
  color: #d9534f;
  margin-top: -0.3rem;
  margin-bottom: 0.4rem;
`;

const SmallNote = styled.p`
  margin: 0.8rem 0 0;
  font-size: 0.8rem;
  font-family: ${({ theme }) => theme.fonts.descriptions};
  color: #777;
`;

const AskQuestionSection = () => {
  const [values, setValues] = useState<AskQuestionValues>({
    name: "",
    email: "",
    question: "",
  });
  const [errors] = useState<{
    name?: string;
    email?: string;
    question?: string;
  }>({}); //TODO: Add validator

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(values);
    // TODO: send mail / save to backend / show notification
  };

  const changeValueHandler = (
    field: keyof AskQuestionValues,
    value: string
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <Wrapper>
      <Box>
        <Title>Не откриваш отговор на своя въпрос?</Title>
        <Text>Пиши ми тук и ще ти отговоря възможно най-скоро.</Text>

        <Form onSubmit={submitHandler}>
          <Field>
            <Label htmlFor="faq-name">Име</Label>
            <Input
              id="faq-name"
              value={values.name}
              onChange={(e) => changeValueHandler("name", e.target.value)}
              placeholder="Как да се обърна към теб?"
              $error={!!errors.name}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="faq-email">Имейл</Label>
            <Input
              id="faq-email"
              value={values.email}
              onChange={(e) => changeValueHandler("email", e.target.value)}
              placeholder="you@example.com"
              $error={!!errors.email}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </Field>

          <Field style={{ gridColumn: "1 / -1" }}>
            <Label htmlFor="faq-question">Твоят въпрос</Label>
            <Textarea
              id="faq-question"
              value={values.question}
              onChange={(e) => changeValueHandler("question", e.target.value)}
              placeholder="Разкажи ми, с какво мога да помогна 😊"
              $error={!!errors.question}
            />
            {errors.question && <ErrorText>{errors.question}</ErrorText>}
          </Field>

          <SubmitRow>
            <AppButton>Изпрати въпроса</AppButton>
          </SubmitRow>
        </Form>

        <SmallNote>
          Формата все още е в тестов режим – ако не получиш отговор, винаги
          можеш да ми пишеш и в Instagram.
        </SmallNote>
      </Box>
    </Wrapper>
  );
};

export default AskQuestionSection;
