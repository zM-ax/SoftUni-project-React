import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import styled from "styled-components";
import { useThemeMode } from "../context/useThemeMode";

import ProfileImageLight from "../assets/images/profile_image_light.png";
import ProfileImageDark from "../assets/images/profile_image_dark.png";

const ProfileImgStyled = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 1rem;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.pageBackground};
`;

const HeaderProfileIcon = () => {
  const { mode } = useThemeMode();
  const navigate = useNavigate();
  const userRedux = useAppSelector((s) => s.user.user);

  const defaultImage = mode === "dark" ? ProfileImageLight : ProfileImageDark;

  const imageUrl = userRedux?.profileImageURL || defaultImage;

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <ProfileImgStyled
      src={imageUrl}
      alt="Профил"
      title={userRedux?.isLoggedIn ? "Моят профил" : "Вход / Регистрация"}
      onClick={handleClick}
    />
  );
};

export default HeaderProfileIcon;
