import { Outlet, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const MainWrapper = styled.div<{ $bg?: string }>`
  min-height: 100vh;
  background: ${({ $bg }) => $bg || '#222'};
  padding-top: 70px;
`;

const MainLayout = () => {
  // In case we want a different background for specific pages
  const { background } = useOutletContext<{ background?: string }>() || {};

  return (
    <>
      <Header />
      <MainWrapper $bg={background}>
        <Outlet />
      </MainWrapper>
    </>
  );
};

export default MainLayout;
