import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabsWrapper, LogoutWrapper } from "./MyProfilePage.styles";
import { AppButton } from "../../styles/AppButton";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import { updateUserAsync, deleteUserAsync } from "../../services/db/users";
import { clearUser, updateUser } from "../../store/userSlice";

import ProfileCard from "./ProfileCard";
import Toast from "../../components/Toast";
import OrdersSectionComponent from "./OrdersSection";
import DangerZoneSection from "./DangerZoneSection";

import { getAuth, signOut, deleteUser as deleteAuthUser } from "firebase/auth";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { AppPageWrapper } from "../../styles/AppPageWrapper";

const MyProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    profileImageURL: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "orders">("personal");

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
      address: user.address ?? "",
      profileImageURL: user.profileImageURL ?? "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (!user) {
        throw new Error("Няма активен потребител.");
      }

      if (!form.name.trim()) {
        setError("Името е задължително поле.");
        setIsSaving(false);
        return;
      }

      const trimmedName = form.name.trim();
      const trimmedPhone = form.phoneNumber.trim();
      const trimmedAddress = form.address.trim();

      // 1) Update Firestore
      await updateUserAsync(user.id, {
        name: trimmedName,
        phoneNumber: trimmedPhone || "",
        address: trimmedAddress || "",
        profileImageURL: form.profileImageURL,
      });

      // Redux userSlice
      dispatch(
        updateUser({
          name: trimmedName,
          phoneNumber: trimmedPhone || "",
          address: trimmedAddress || "",
          profileImageURL: form.profileImageURL,
        })
      );

      setSuccess("Профилът е обновен успешно.");
    } catch (err) {
      console.error(err);
      setError("Грешка при обновяване на профила.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!user) {
      setError("Няма активен потребител.");
      return;
    }

    const file = e.target.files[0];
    setIsUploadingPhoto(true);
    setError(null);
    setSuccess(null);

    try {
      // Upload в Firebase Storage
      const fileExt = file.name.split(".").pop() || "jpg";
      const photoRef = ref(storage, `users/${user.id}/profile.${fileExt}`);

      await uploadBytes(photoRef, file);
      const downloadUrl = await getDownloadURL(photoRef);

      // Save photoUrl в Firestore
      await updateUserAsync(user.id, {
        profileImageURL: downloadUrl,
      });

      // Update form state
      setForm((prev) => ({
        ...prev,
        profileImageURL: downloadUrl,
      }));

      // Update Redux user
      dispatch(
        updateUser({
          profileImageURL: downloadUrl,
        })
      );

      setSuccess("Профилната снимка беше обновена.");
    } catch (err) {
      console.error(err);
      setError("Нещо се обърка при качването на снимката.");
    } finally {
      setIsUploadingPhoto(false);
      // clear input, so the same file can be selected again
      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    setError(null);
    setSuccess(null);

    try {
      const auth = getAuth();
      await signOut(auth);

      dispatch(clearUser());
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Грешка при изход от профила. Опитай отново.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) {
      setError("Няма активен потребител.");
      return;
    }

    const confirmed = window.confirm(
      "Сигурна ли си, че искаш да изтриеш профила си? Това действие може да е необратимо."
    );
    if (!confirmed) return;

    setError(null);
    setSuccess(null);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      // 1) Delete Firestore profile
      await deleteUserAsync(user.id);

      // 2) Delete Firebase Auth user (if exists)
      if (currentUser) {
        await deleteAuthUser(currentUser);
      }

      // 3) Clear Redux + redirect
      dispatch(clearUser());
      navigate("/");
    } catch (err: unknown) {
      console.error(err);

      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code?: string }).code === "auth/requires-recent-login"
      ) {
        setError(
          "От съображения за сигурност трябва отново да влезеш в профила си, преди да го изтриеш."
        );
        return;
      }

      setError("Нещо се обърка при изтриването на профила. Опитай отново.");
    }
  };

  // ************************************** main render **************************************
  if (!user || !user.isLoggedIn) {
    return null;
  }

  return (
    <AppPageWrapper>
      <TabsWrapper>
        <AppButton
          type="button"
          $variant={activeTab === "personal" ? "primary" : "secondary"}
          onClick={() => setActiveTab("personal")}
        >
          Лични данни
        </AppButton>
        <AppButton
          type="button"
          $variant={activeTab === "orders" ? "primary" : "secondary"}
          onClick={() => setActiveTab("orders")}
        >
          Поръчки
        </AppButton>
      </TabsWrapper>

      {activeTab === "personal" && (
        <>
          <ProfileCard
            form={form}
            isSaving={isSaving}
            isUploadingPhoto={isUploadingPhoto}
            handleChange={handleChange}
            handleSave={handleSave}
            handlePhotoChange={handlePhotoChange}
          />
          {success && <Toast message={success} />}
          {error && (
            <p
              style={{
                color: "#b71c1c",
                fontSize: "0.95rem",
                margin: "12px 0",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <LogoutWrapper>
            <AppButton
              type="button"
              onClick={handleLogout}
              $variant="secondary"
              style={{ marginTop: "3rem", marginBottom: "3rem" }}
            >
              Изход от профила
            </AppButton>
          </LogoutWrapper>
          <DangerZoneSection onDelete={handleDeleteAccount} />
        </>
      )}

      {activeTab === "orders" && <OrdersSectionComponent />}
    </AppPageWrapper>
  );
};

export default MyProfilePage;
