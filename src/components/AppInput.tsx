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
  border: 1px solid ${({ $error }) => ($error ? "#d32f2f" : "#ddd")};
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
    box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.2);
  }
`;

const StyledInput = styled.input<StyleProps>`
  border-radius: 999px;
  ${baseStyles}
`;

const StyledTextarea = styled.textarea<StyleProps>`
  border-radius: 18px;
  min-height: 2.5em;
  resize: vertical;
  ${baseStyles}
`;

export const AppInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  AppInputProps
>(function AppInput({ multiline, rows = 3, $width, $error, ...props }, ref) {
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
});
