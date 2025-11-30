import React from "react";
import styled, { css } from "styled-components";

export type AppInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** If no width is provided, defaults to 100% */
  $width?: string | number;
  /** Colors the border red on error */
  $error?: boolean;
  /** If true, renders a textarea instead of an input */
  multiline?: boolean;
  /** Number of rows for textarea (default 3) */
  rows?: number;
};

type StyleProps = {
  $width?: string | number;
  $error?: boolean;
};

const baseStyles = css<StyleProps>`
  display: block;
  padding: 0.55rem 0.9rem;
  font-size: 0.95rem;
  font-family: ${({ theme }) => theme.fonts.body};
  width: ${({ $width }) =>
    $width !== undefined
      ? typeof $width === "number"
        ? `${$width}px`
        : $width
      : "100%"};
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.16);
    background: ${({ theme }) => theme.colors.inputBackground};
  }
`;

const StyledInput = styled.input<StyleProps>`
  border: 2.2px solid
    ${({ theme }) => theme.colors.headerBorder || "rgba(0, 0, 0, 0.12)"};
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.body};
  background: ${({ theme }) => theme.colors.inputBackground || "#ffffff"};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.85rem 1rem;
  ${baseStyles}

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }

   &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(183, 127, 57, 0.2);
    background: ${({ theme }) => theme.colors.pageBackground};
  }
`;

const StyledTextarea = styled.textarea<StyleProps>`
  width: 100%;
  min-height: 2.5em;
  resize: vertical;
  border-radius: 14px;
  border: 1px solid
    ${({ theme }) => theme.colors.headerBorder || "rgba(0, 0, 0, 0.12)"};
  padding: 0.85rem 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  line-height: 1.5;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  ${baseStyles}
  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    background 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(183, 127, 57, 0.2);
    background: ${({ theme }) => theme.colors.pageBackground};
  }
`;

export function AppInput({
  multiline,
  rows = 3,
  $width,
  $error,
  ref,
  ...props
}: AppInputProps & {
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}) {
  if (multiline) {
    return (
      <StyledTextarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        rows={rows}
        $width={$width}
        $error={$error}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <StyledInput
      ref={ref as React.Ref<HTMLInputElement>}
      $width={$width}
      $error={$error}
      {...props}
    />
  );
}
