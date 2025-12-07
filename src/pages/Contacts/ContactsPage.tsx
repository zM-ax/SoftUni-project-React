import React, { useState, type FormEvent } from "react";
import { AppInput } from "../../components/AppInput";
import { AppButton } from "../../styles/AppButton";
import { 
  ContentWrapper,
  PageTitle,
  PageSubtitle,
  ContentGrid,
  ContactInfo,
  InfoTitle,
  InfoText,
  InfoItem,
  InfoLabel,
  InfoValue,
  FormCard,
  FormRow,
  HalfField,
  FullField,
  StyledTextArea,
  StyledSelect,
  HelperText,
  ButtonRow,
  SuccessMessage,
  ErrorMessage,
} from "./ContactsPage.styles";
import { AppPageWrapper } from "../../styles/AppPageWrapper";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  inquiryType: "",
  message: "",
};

const ContactsPage: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return "Моля, попълнете име, имейл и съобщение.";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email.trim())) {
      return "Моля, въведете валиден имейл адрес.";
    }

    return null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    // Тук по-късно може да вържем Firestore / Cloud Function
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(
        "Благодаря за запитването! Ще се свържа с вас възможно най-скоро. ❤️"
      );
      setForm(initialState);
    }, 500);
  };

  return (
    <AppPageWrapper>
      <ContentWrapper>
        <PageTitle>Свържете се с мен</PageTitle>
        <PageSubtitle>
          Имате въпрос за поръчка, идея за събитие или просто искате да ми
          пишете? Попълнете формата и ще се върна с отговор възможно най-скоро.
        </PageSubtitle>

        <ContentGrid>
          <ContactInfo>
            <InfoTitle>Още начини да се чуем</InfoTitle>
            <InfoText>
              Ако предпочитате, може да ми пишете директно в Instagram или по
              имейл. Обикновено отговарям в рамките на 1–2 работни дни.
            </InfoText>

            <InfoItem>
              <InfoLabel>Имейл</InfoLabel>
              <InfoValue>hello@dveshepibrashno.bg</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Instagram</InfoLabel>
              <InfoValue>@dve_shepi_brashno</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Повод</InfoLabel>
              <InfoText>
                Рождени дни, фирмени събития, семейни празници или просто „искам
                нещо сладко“ – насреща съм за идеи. 🍰
              </InfoText>
            </InfoItem>
          </ContactInfo>

          <FormCard onSubmit={handleSubmit} noValidate>
            <FormRow>
              <HalfField>
                <AppInput
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Име и фамилия*"
                />
              </HalfField>
              <HalfField>
                <AppInput
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Имейл*"
                />
              </HalfField>
            </FormRow>

            <FormRow>
              <HalfField>
                <AppInput
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Телефон (по желание)"
                />
              </HalfField>
              <HalfField>
                <AppInput
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Повод / тема"
                />
              </HalfField>
            </FormRow>

            <FormRow>
              <HalfField>
                <StyledSelect
                  id="inquiryType"
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Тип запитване (по желание)
                  </option>
                  <option value="birthday">Рожден ден</option>
                  <option value="family">Семеен празник</option>
                  <option value="corporate">Фирмено събитие</option>
                  <option value="holiday">Празнични кутии</option>
                  <option value="other">Друго</option>
                </StyledSelect>
              </HalfField>
              {/* можеш да оставиш второто поле празно за бъдещ чекбокс/допълнение */}
              <HalfField />
            </FormRow>

            <FullField>
              <StyledTextArea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Разкажете ми повече за повода, дата, брой хора, предпочитани десерти..."
              />
              <HelperText>* Задължителни полета</HelperText>
            </FullField>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <ButtonRow>
              <AppButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Изпращане..." : "Изпрати запитване"}
              </AppButton>
            </ButtonRow>
          </FormCard>
        </ContentGrid>
      </ContentWrapper>
    </AppPageWrapper>
  );
};

export default ContactsPage;
