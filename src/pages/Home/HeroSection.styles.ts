// HeroSection.styles.ts
import styled, { keyframes, css } from "styled-components";
import backgroundImage from "../../assets/images/home/Banner_Home_Page.webp";

const heroZoom = keyframes`
  from {
    transform: scale(1.05) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.56) translate3d(0, -15px, 0);
  }
`;

export const HeroSectionStyled = styled.section`
  position: relative;
  width: 100%;        /* 100% от HomeContainer */
  min-height: 70vh;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transform: scale(1.05);
    animation: ${heroZoom} 18s ease-in-out infinite alternate;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.55)
    );
  }
`;


export const HeroContent = styled.div`
  position: relative;
  z-index: 2; /* над before/after слоевете */
  max-width: 640px;
  padding: 2rem 1.5rem;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 3vw + 1rem, 3.4rem);
  margin-bottom: 2.2rem;
  line-height: 1.1;
  align-self: flex-start;
  font-family: ${({ theme }) => theme.fonts.titles};
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 1vw + 0.7rem, 1.2rem);
  margin-bottom: 2rem;
  line-height: 1.5;
  opacity: 0.95;
`;

export const HeroButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const HeroButton = styled.button<{ $variant?: "primary" | "outline" }>`
  border-radius: 999px;
  padding: 0.75rem 1.8rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: background 0.15s ease, color 0.15s ease, transform 0.05s ease;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};

  ${({ $variant = "primary", theme }) =>
    $variant === "primary"
      ? css`
          background: ${theme.colors.primary};
          color: #fff;

          &:hover {
            background: ${theme.colors.primaryDark};
          }
        `
      : css`
          background: transparent;
          color: #fff;

          &:hover {
            background: rgba(0, 0, 0, 0.35);
          }
        `}

  &:active {
    transform: translateY(1px);
  }
`;
