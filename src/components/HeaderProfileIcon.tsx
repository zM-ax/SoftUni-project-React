import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import styled from "styled-components";
import { useThemeMode } from "../context/useThemeMode";

const ProfileImgStyled = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 1rem;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.pageBackground};

  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
`;

const HeaderProfileIcon = () => {
  const { mode } = useThemeMode();
  const navigate = useNavigate();
  const { firebaseUser } = useAppSelector((s) => s.auth);

  const handleClick = () => {
    console.log(firebaseUser)
    navigate("/profile");
  }; 

  return (
    <ProfileImgStyled
      src={
        mode === "dark"
          ? "../../src/assets/images/profile_image_light.png"
          : "../../src/assets/images/profile_image_dark.png"
      }
      alt="Профил"
      title={firebaseUser ? "Моят профил" : "Вход / Регистрация"}
      onClick={handleClick}
    />
  );
};

export default HeaderProfileIcon;
