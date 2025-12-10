import React, { useState, type FormEvent } from "react";
import { AppButton } from  "../../styles/AppButton";
import { StarRating } from  "../starsRating/StarsRating";
import {
  Overlay,
  ModalCard,
  ModalTitle,
  ModalSubtitle,
  FieldLabel,
  Textarea,
  ButtonsRow,
  ErrorText,
} from "./RatingModal.styles";

type RatingModalProps = {
  productTitle: string;
  initialRating?: number;
  onClose: () => void;
  onSubmit: (data: { rating: number; comment: string }) => Promise<void> | void;
  isSubmitting?: boolean;
};

export const RatingModal: React.FC<RatingModalProps> = ({
  productTitle,
  initialRating = 5,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setRating(initialRating);
    setComment("");
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!rating) {
      setError("Моля, избери поне 1 звезда.");
      return;
    }

    try {
      await onSubmit({ rating, comment: comment.trim() });
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Възникна грешка при изпращане на ревюто.");
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Оцени десерта</ModalTitle>
        <ModalSubtitle>{productTitle}</ModalSubtitle>

        <form onSubmit={handleSubmit}>
          <FieldLabel>Твоят рейтинг</FieldLabel>
          <StarRating
            value={rating}
            editable
            showNumber={false}
            onChange={(val: number) => setRating(val)}
          />

          <FieldLabel style={{ marginTop: "1rem" }}>
            Сподели впечатленията си
          </FieldLabel>
          <Textarea
            rows={5}
            placeholder="Допадна ли ти десертът? Текстът е по избор, но много ми помага 💛"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {error && <ErrorText>{error}</ErrorText>}

          <ButtonsRow>
            <AppButton
              type="button"
              $variant="text"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Отказ
            </AppButton>

            <AppButton
              type="submit"
              $variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Изпращам…" : "Изпрати ревю"}
            </AppButton>
          </ButtonsRow>
        </form>
      </ModalCard>
    </Overlay>
  );
};
