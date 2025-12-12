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
import { useNavigate } from "react-router";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate()
  return (
    <HeroSectionStyled>
      <HeroContent>
        <HeroTitle>Вкусът на детството</HeroTitle>
        <HeroSubtitle>
          Доставка за София/ Взимане от място с предварителна поръчка
        </HeroSubtitle>

        <HeroButtonsRow>
          {/* <HeroButton $variant="primary">Разгледай десертите</HeroButton> */}
          <HeroButton $variant="outline" onClick={() => navigate("/products")}>Разгледай десертите</HeroButton>
        </HeroButtonsRow>
      </HeroContent>
    </HeroSectionStyled>
  );
};
