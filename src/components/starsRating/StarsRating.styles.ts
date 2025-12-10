import styled from "styled-components";

export const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

export const StarButton = styled.button<{
  $active: boolean;
  $editable: boolean;
}>`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 1;
  cursor: ${({ $editable }) => ($editable ? "pointer" : "default")};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.headerBorder};

  &:hover {
    ${({ $editable, theme }) =>
      $editable
        ? `color: ${theme.colors.primaryDark}; transform: translateY(-1px);`
        : ""}
  }

  transition: color 0.15s ease, transform 0.15s ease;
`;

export const RatingText = styled.span`
  margin-left: 0.35rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;
