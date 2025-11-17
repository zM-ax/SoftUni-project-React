// Hero.tsx
import React from "react";
import { 
  HeroSectionStyled, 
  HeroContent, 
  HeroTitle, 
  HeroSubtitle, 
  HeroButtonsRow, 
  HeroButton 
} from "./HeroSection.styles";

export const HeroSection: React.FC = () => {
  return (
    <HeroSectionStyled>
      <HeroContent>
        <HeroTitle>Вкус, който връща спомени</HeroTitle>
        <HeroSubtitle>
          Десерти от детството, приготвени с търпение, истински продукти 
          и щипка носталгия.
        </HeroSubtitle>

        <HeroButtonsRow>
          <HeroButton variant="primary">
            Разгледай десертите
          </HeroButton>
          <HeroButton variant="outline">
            Виж датите за доставка
          </HeroButton>
        </HeroButtonsRow>
      </HeroContent>
    </HeroSectionStyled>
  );
};
