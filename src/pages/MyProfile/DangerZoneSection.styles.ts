import styled from "styled-components";

export const DangerZoneCard = styled.section`
  border-radius: 16px;
  padding: 1.4rem 1.5rem 1.2rem;
  border: 1px solid
    ${({ theme }) => theme.colors.errorBorder || "rgba(183, 28, 28, 0.3)"};
  background: ${({ theme }) =>
    theme.colors.errorBg || "rgba(183, 28, 28, 0.04)"};
`;

export const DangerHeader = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.error || "#8c1b1b"};
`;

export const DangerText = styled.p`
  margin: 0 0 0.9rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.errorText || "#5b2525"};
  line-height: 1.5;
`;

export const DangerActions = styled.div`
  display: flex;
  justify-content: flex-start;
`;
