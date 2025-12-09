import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.cardBackground};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 0.85rem;
  }
`;

/* ---------- TH (headers) ---------- */

export const ThBase = styled.th`
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.navigation};
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.pageBackground};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ThName = styled(ThBase)`
  text-align: left;
  min-width: 220px;
`;

export const ThType = styled(ThBase)`
  text-align: left;
  min-width: 100px;
`;

export const ThPrice = styled(ThBase)`
  text-align: right;
  min-width: 90px;
`;

export const ThHome = styled(ThBase)`
  text-align: center;
  min-width: 90px;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

export const ThActive = styled(ThBase)`
  text-align: center;
  min-width: 80px;
`;

export const ThCreated = styled(ThBase)`
  text-align: center;
  min-width: 120px;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

export const ThActions = styled(ThBase)`
  text-align: right;
  min-width: 160px;
`;

/* ---------- TD (cells) ---------- */

export const TdBase = styled.td`
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
  vertical-align: top;
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const TdName = styled(TdBase)`
  text-align: left;
  min-width: 220px;
`;

export const TdType = styled(TdBase)`
  text-align: left;
  min-width: 100px;
`;

export const TdPrice = styled(TdBase)`
  text-align: right;
  min-width: 90px;
`;

export const TdHome = styled(TdBase)`
  text-align: center;
  min-width: 90px;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

export const TdActive = styled(TdBase)`
  text-align: center;
  min-width: 80px;
`;

export const TdCreated = styled(TdBase)`
  text-align: center;
  min-width: 120px;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

export const TdActions = styled(TdBase)`
  text-align: right;
  min-width: 160px;

  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: column;
    align-items: flex-end;
  }
`;
