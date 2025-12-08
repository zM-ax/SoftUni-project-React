import styled from "styled-components";

export const PageContainer = styled.main`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 5.5rem 1rem 3rem;
  min-height: calc(100vh - 4.5rem);
  background: ${({ theme }) => theme.colors.pageBackground};

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 4.5rem 1rem 3rem;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1.2rem;
`;

export const BackButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  @media ${({ theme }) => theme.devices.mobile} {
    position: static;
    transform: none;
    margin-bottom: 0.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.pageBackground};
  border-radius: 16px;
  padding: 1.4rem 1.2rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const Value = styled.span``;

export const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.9rem 0 0.6rem;
`;

export const ItemRow = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1rem;
  margin-top: 0.9rem;
  margin-bottom: 0.4rem;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

export const LoadingText = styled.p`
  font-size: 0.95rem;
`;
