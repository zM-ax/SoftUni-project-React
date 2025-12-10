import { HeroSection } from "./HeroSection";
import { AppPageWrapper } from "../../styles/AppPageWrapper";

import {
  SubtitleStyled,
  Section,
  SectionTitle,
  SectionText,
  AboutImage,
  DessertsGrid,
  DessertCard,
  DessertImage,
  StepsContainer,
  StepBox,
  StepNumber,
} from "./HomePage.styles";

const HomePage = () => {
  return (
    <AppPageWrapper>
      <HeroSection />

      {/* <ImageTitleStyled
        src={headerLogo}
        alt="Български десерти - Две шепи брашно"
      /> */}

      <SubtitleStyled>
        Автентични български десерти, приготвени с любов и традиционни рецепти
        от детството ни.
      </SubtitleStyled>

      {/* ************* About us  *************  */}
      <Section>
        <SectionTitle>Вкусът на детството</SectionTitle>
        <SectionText>
          Всяка кутия идва с обещание — да върне онези сладки спомени, когато
          баба вадеше тава с топли сладки от фурната. Ние вярваме, че десертите
          не са просто храна, а малки моменти на уют, радост и nostalgia.
        </SectionText>

        <AboutImage />
      </Section>

      {/* ************* Favorite desserts ************* */}
      <Section>
        <SectionTitle>Любими сладки на клиентите</SectionTitle>
        <SectionText>
          Ето част от десертите, които най-често топлят сърцата.
        </SectionText>

        <DessertsGrid>
          <DessertCard>
            <DessertImage />
            Меденки с крем
          </DessertCard>

          <DessertCard>
            <DessertImage />
            Прасковки
          </DessertCard>

          <DessertCard>
            <DessertImage />
            Еклерова торта
          </DessertCard>

          <DessertCard>
            <DessertImage />
            Скалички
          </DessertCard>
        </DessertsGrid>
      </Section>

      {/* ************* How it works ************* */}
      <Section>
        <SectionTitle>Как работи?</SectionTitle>

        <StepsContainer>
          <StepBox>
            <StepNumber>1.</StepNumber>
            Избираш любимите си десерти
          </StepBox>

          <StepBox>
            <StepNumber>2.</StepNumber>
            Задаваш дата за взимане или доставка
          </StepBox>

          <StepBox>
            <StepNumber>3.</StepNumber>
            Получаваш кутия уют — направена за теб 💛
          </StepBox>
        </StepsContainer>
      </Section>
    </AppPageWrapper>
  );
};

export default HomePage;
