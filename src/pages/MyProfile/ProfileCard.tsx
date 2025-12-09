import { AppInput } from "../../components/AppInput";
import { AppButton } from "../../styles/AppButton";
import { AuthField } from "../../styles/AppInputField";
import {
  Card,
  CardHeader,
  Title,
  Subtitle,
  PhotoSection,
  AvatarCircle,
  AvatarImage,
  AvatarInitial,
  ChangePhotoLabel,
  HiddenFileInput,
  ProfileLabel,
} from "./ProfileCard.styles";

export interface ProfileCardProps {
  form: {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    profileImageURL: string;
  };
  isSaving: boolean;
  isUploadingPhoto: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSave: (e: React.FormEvent) => void;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileCard = ({
  form,
  isSaving,
  isUploadingPhoto,
  handleChange,
  handleSave,
  handlePhotoChange,
}: ProfileCardProps) => (
  <Card>
    <CardHeader>
      <Title>Моят профил</Title>
      <Subtitle>
        Тук можеш да обновиш името си, телефона, адреса за доставка и профилната
        си снимка.
      </Subtitle>
    </CardHeader>
    <PhotoSection>
      <AvatarCircle>
        {form.profileImageURL ? (
          <AvatarImage src={form.profileImageURL} alt="Профилна снимка" />
        ) : (
          <AvatarInitial>
            {form.name ? form.name.charAt(0).toUpperCase() : "?"}
          </AvatarInitial>
        )}
      </AvatarCircle>
      <ChangePhotoLabel>
        {isUploadingPhoto ? "Качване..." : "Смени снимката"}
        <HiddenFileInput
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </ChangePhotoLabel>
    </PhotoSection>
    <form
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      onSubmit={handleSave}
    >
      <AuthField>
        <ProfileLabel htmlFor="name">Име</ProfileLabel>
        <AppInput
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          $width="50%"
          style={{ alignSelf: "center" }}
        />
      </AuthField>
      <AuthField>
        <ProfileLabel htmlFor="email">Имейл</ProfileLabel>
        <AppInput
          id="email"
          name="email"
          type="email"
          value={form.email}
          disabled
          $width="50%"
          style={{ alignSelf: "center", color: "#bdbcbcff" }}
        />
        <small
          style={{ fontSize: "0.8rem", color: "#8a7a6a", alignSelf: "center" }}
        >
          Имейлът се използва за вход и не може да бъде променян тук.
        </small>
      </AuthField>
      <AuthField>
        <ProfileLabel htmlFor="phoneNumber">Телефон</ProfileLabel>
        <AppInput
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="+359..."
          $width="50%"
          style={{ alignSelf: "center" }}
        />
      </AuthField>
      <AuthField>
        <ProfileLabel htmlFor="address">Адрес за доставка</ProfileLabel>
        <AppInput
          id="address"
          name="address"
          multiline
          rows={3}
          value={form.address}
          onChange={handleChange}
          placeholder="гр. София, район..., улица..., блок..., вход..."
          $width="50%"
          style={{ alignSelf: "center" }}
        />
      </AuthField>
      {/* Error and success messages are now handled by Toast in MyProfilePage */}
      <AppButton
        type="submit"
        disabled={isSaving}
        style={{ alignSelf: "center", width: "50%" }}
        $variant="primary"
      >
        {isSaving ? "Запазване..." : "Запази промените"}
      </AppButton>
    </form>
  </Card>
);

export default ProfileCard;
