import styled from "styled-components";

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.authBg || theme.colors.pageBackground};
  border-radius: 18px;
  padding: 2.1rem 2rem 2rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.14);
  border: 1px solid ${({ theme }) => theme.colors.headerBorder};
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.6rem 1.4rem 1.6rem;
  }
`;

export const CardHeader = styled.header`
  margin-bottom: 1.6rem;
`;

export const Title = styled.h1`
  margin: 0 0 0.4rem;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.textSecondary || '#7a6a5a'};
  line-height: 1.5;
`;

export const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.8rem;
  gap: 0.6rem;
`;

export const AvatarCircle = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.pageBackground};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarInitial = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ChangePhotoLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.primary + '55'};
  background: ${({ theme }) => theme.colors.pageBackground};
  color: ${({ theme }) => theme.colors.primaryDark};
  transition: background 0.15s ease, transform 0.05s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.primary + '22'};
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
