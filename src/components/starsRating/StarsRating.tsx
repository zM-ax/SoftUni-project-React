import React, { useState } from "react";
import { StarsWrapper, StarButton, RatingText } from "./StarsRating.styles";

type StarRatingProps = {
  value: number; // current rating
  max?: number; // 5
  editable?: boolean; // if true - can be clicked
  onChange?: (value: number) => void;
  totalReviews?: number;
  showNumber?: boolean; // whether to show "4.3 (23)"
};

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  max = 5,
  editable = false,
  onChange,
  totalReviews,
  showNumber = true,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;

  const handleClick = (starValue: number) => {
    if (!editable || !onChange) return;
    onChange(starValue);
  };

  const handleMouseEnter = (starValue: number) => {
    if (!editable) return;
    setHoverValue(starValue);
  };

  const handleMouseLeave = () => {
    if (!editable) return;
    setHoverValue(null);
  };

  return (
    <StarsWrapper>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isActive = displayValue >= starValue;

        return (
          <StarButton
            key={starValue}
            type={editable ? "button" : "button"}
            $active={isActive}
            $editable={editable}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            aria-label={`${starValue} звезди`}
          >
            {isActive ? "★" : "☆"}
          </StarButton>
        );
      })}

      {showNumber && (
        <RatingText>
          {value.toFixed(1)}
          {typeof totalReviews === "number" && totalReviews > 0
            ? ` · ${totalReviews} ${totalReviews === 1 ? "мнение" : "мнения"}`
            : null}
        </RatingText>
      )}
    </StarsWrapper>
  );
};
