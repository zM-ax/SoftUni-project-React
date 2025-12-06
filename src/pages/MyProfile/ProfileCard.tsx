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
} from "./ProfileCard.styles";

export interface ProfileCardProps {
  form: {
    name: string;
    email: string;
    phone: string;
    address: string;
    photoUrl: string;
  };
  isSaving: boolean;
  isUploadingPhoto: boolean;
  error: string | null;
  success: string | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSave: (e: React.FormEvent) => void;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firebaseUser: any;
}

const ProfileCard = ({
  form,
  isSaving,
  isUploadingPhoto,
  error,
  success,
  handleChange,
  handleSave,
  handlePhotoChange,
  firebaseUser,
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
        {form.photoUrl ? (
          <AvatarImage src={form.photoUrl} alt="Профилна снимка" />
        ) : (
          <AvatarInitial>
            {form.name
              ? form.name.charAt(0).toUpperCase()
              : (firebaseUser.email || "?").charAt(0).toUpperCase()}
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
        <label htmlFor="name" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
          Име
        </label>
        <AppInput
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          $width="70%"
          style={{ alignSelf: "center" }}
        />
      </AuthField>
      <AuthField>
        <label htmlFor="email" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
          Имейл
        </label>
        <AppInput
          id="email"
          name="email"
          type="email"
          value={form.email}
          disabled
          $width="70%"
          style={{ alignSelf: "center" }}
        />
        <small style={{ fontSize: "0.8rem", color: "#8a7a6a" }}>
          Имейлът се използва за вход и не може да бъде променян тук.
        </small>
      </AuthField>
      <AuthField>
        <label htmlFor="phone" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
          Телефон
        </label>
        <AppInput
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+359..."
          $width="70%"
          style={{ alignSelf: "center" }}
        />
      </AuthField>
      <AuthField>
        <label
          htmlFor="address"
          style={{ fontSize: "0.9rem", fontWeight: 600 }}
        >
          Адрес за доставка
        </label>
        <AppInput
          id="address"
          name="address"
          multiline
          rows={3}
          value={form.address}
          onChange={handleChange}
          placeholder="гр. София, район..., улица..., блок..., вход..."
          $width="70%"
          style={{ alignSelf: "center" }}
        />
      </AuthField>
      {error && (
        <p style={{ color: "#b71c1c", fontSize: "0.9rem", margin: 0 }}>
          {error}
        </p>
      )}
      {success && (
        <p style={{ color: "#2e7d32", fontSize: "0.9rem", margin: 0 }}>
          {success}
        </p>
      )}
      <AppButton
        type="submit"
        disabled={isSaving}
        style={{ alignSelf: "center", width: "70%" }}
        $variant="primary"
      >
        {isSaving ? "Запазване..." : "Запази промените"}
      </AppButton>
    </form>
  </Card>
);

export default ProfileCard;
