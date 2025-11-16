
import styled from 'styled-components';
import { DEVICES } from '../constants/breakpoints';
import { Link, useNavigate } from 'react-router-dom'; 

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: padding 0.2s;

  @media ${DEVICES.tablet} {
    padding: 0.5rem 0.5rem;
  }
  @media (min-width: ${DEVICES.laptop.replace('max-width', 'min-width')}) {
    padding: 1.5rem 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  transition: gap 0.2s;

  @media ${DEVICES.mobile} {
    gap: 0.5rem;
    font-size: 0.95rem;
  }
  @media ${DEVICES.tablet} {
    gap: 1rem;
  }
  @media (min-width: ${DEVICES.laptop.replace('max-width', 'min-width')}) {
    gap: 2.5rem;
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 2rem;
  cursor: pointer;
  border: 2px solid #e67e22;
  background: #f3f3f3;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  &:hover {
    box-shadow: 0 4px 16px rgba(230,126,34,0.15);
  }
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #e67e22;
  }
`;

 

const Header = () => { 
   const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Nav>
        <StyledLink to="/">Начало</StyledLink>
        <StyledLink to="/testimonials">Тестимониали</StyledLink>
        <StyledLink to="/diy">DIY</StyledLink>
        <ProfileImg
          src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
          alt="Профил"
          title="Вход / Профил"
          onClick={() => navigate('/login')}
        />
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
