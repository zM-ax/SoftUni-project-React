// Hero.tsx
import React from "react";
import {
  HeroSectionStyled,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroButtonsRow,
  HeroButton,
} from "./HeroSection.styles";

export const HeroSection: React.FC = () => {
  return (
    <HeroSectionStyled>
      <HeroContent>
        <HeroTitle>Вкусът на детството</HeroTitle>
        <HeroSubtitle>
          Доставка за София/ Взимане от място с предварителна поръчка
        </HeroSubtitle>

        <HeroButtonsRow>
          <HeroButton $variant="primary">Разгледай десертите</HeroButton>
          <HeroButton $variant="outline">Виж датите за доставка</HeroButton>
        </HeroButtonsRow>
      </HeroContent>
    </HeroSectionStyled>
  );
};
