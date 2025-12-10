import React, { useState, type TouchEvent } from "react";
import { StarRating } from "../starsRating/StarsRating";
import {
  CarouselWrapper,
  CarouselHeader,
  CarouselTitle,
  Slide,
  AuthorRow,
  AuthorName,
  DateText,
  CommentText,
  NavButton,
  DotsRow,
  Dot,
  EmptyText,
} from "./ReviewCarousel.styles";
import type { Review } from "../../types/review";

type Props = {
  reviews: Review[];
};

export const ReviewCarousel: React.FC<Props> = ({ reviews }) => {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (!reviews.length) {
    return (
      <CarouselWrapper>
        <CarouselHeader>
          <CarouselTitle>Мнения на клиенти</CarouselTitle>
        </CarouselHeader>
        <EmptyText>
          Все още няма оставени ревюта. Бъди първият, който ще сподели
          впечатленията си.
        </EmptyText>
      </CarouselWrapper>
    );
  }

  const current = reviews[index];

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goNext = () => {
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;

    if (deltaX > 50) goPrev();
    if (deltaX < -50) goNext();

    setTouchStartX(null);
  };

  return (
    <CarouselWrapper>
      <CarouselHeader>
        <CarouselTitle>Мнения на клиенти</CarouselTitle>
        <NavButton type="button" onClick={goPrev} aria-label="Предишно ревю">
          ←
        </NavButton>
        <NavButton type="button" onClick={goNext} aria-label="Следващо ревю">
          →
        </NavButton>
      </CarouselHeader>

      <Slide onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <AuthorRow>
          <AuthorName>{current.userName}</AuthorName>
          <DateText>{current.createdAt}</DateText>
        </AuthorRow>

        <StarRating value={current.rating} showNumber={false} />

        <CommentText>{current.comment}</CommentText>
      </Slide>

      <DotsRow>
        {reviews.map((r, i) => (
          <Dot key={r.id} $active={i === index} />
        ))}
      </DotsRow>
    </CarouselWrapper>
  );
};
