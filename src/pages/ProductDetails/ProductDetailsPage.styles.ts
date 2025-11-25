import styled from "styled-components";

export const DetailsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.authBg};
  border-radius: 18px;
  box-shadow: 0 1px 5px ${({ theme }) => theme.colors.text};
`;

export const TitleStyled = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.titles};
`;

export const DescriptionStyled = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.descriptions};
`;

export const ImageStyled = styled.img`
  max-width: 400px;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;
