import styled from "styled-components";

export const CarouselWrapper = styled.section`
  margin-top: 2.2rem;
`;

export const CarouselHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
`;

export const CarouselTitle = styled.h3`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-right: auto;
`;

export const NavButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.pageBackground};
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  font-size: 0.9rem;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};

  &:hover {
    transform: translateY(-1px);
  }

  transition: transform 0.15s ease;
`;

export const Slide = styled.article`
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  background: ${({ theme }) => theme.colors.pageBackground};
  padding: 0.9rem 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
`;

export const AuthorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
`;

export const AuthorName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

export const DateText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const CommentText = styled.p`
  margin-top: 0.4rem;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const DotsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 0.6rem;
`;

export const Dot = styled.span<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.headerBorder};
`;

export const EmptyText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;
