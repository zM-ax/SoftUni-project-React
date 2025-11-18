import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "text" | "secondary" | "ghost";

interface AppButtonProps {
  $variant?: ButtonVariant;
  $fullWidth?: boolean;
  $marginTop?: string;
}

const BaseButton = styled.button<AppButtonProps>`
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  transition: background 0.15s ease, color 0.15s ease, transform 0.05s ease;
  border-radius: 999px;
  margin-top: ${({ $marginTop }) => $marginTop};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      display: block;
    `}

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    transform: none;
  }

  /* PRIMARY BUTTON */
  ${({ $variant = "primary", theme }) =>
    $variant === "primary" &&
    css`
      padding: 0.6rem 1.4rem;
      background: ${theme.colors.primary};
      color: #fff;
      font-size: 0.9rem;

      &:hover {
        background: ${theme.colors.primaryDark};
      }
    `}

  /* TEXT BUTTON (links below Login/Registration) */
  ${({ $variant, theme }) =>
    $variant === "text" &&
    css`
      padding: 0;
      border: none;
      font-size: 0.9rem;
      background: none;
      color: ${theme.colors.primary};

      &:hover {
        color: ${theme.colors.primaryDark};
      }
    `}

  /* SECONDARY BUTTON */
  ${({ $variant, theme }) =>
    $variant === "secondary" &&
    css`
      padding: 0.6rem 1.4rem;
      background: transparent;
      border: 2px solid ${theme.colors.primary};
      color: ${theme.colors.primary};

      &:hover {
        background: ${theme.colors.primary};
        color: #fff;
      }
    `}

  /* GHOST BUTTON */
  ${({ $variant }) =>
    $variant === "ghost" &&
    css`
      padding: 0.3rem 0.8rem;
      background: transparent;
      color: inherit;

      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    `}
`;

export const AppButton = BaseButton;
