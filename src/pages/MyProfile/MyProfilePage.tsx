import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageWrapper,
  TabsWrapper,
  LogoutWrapper,
} from "./MyProfilePage.styles";
import { AppButton } from "../../styles/AppButton";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateUserProfile } from "../../services/db/users";
import { setAuthState } from "../../store/authSlice";
import ProfileCard from "./ProfileCard";
import OrdersSectionComponent from "./OrdersSection";
import DangerZoneSection from "./DangerZoneSection";
import {
  updateProfile as updateAuthProfile,
  getAuth,
  deleteUser,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { deleteUserProfileDoc } from "../../services/db/users";

const MyProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const firebaseUser = useAppSelector((state) => state.auth.firebaseUser);
  const userProfile = useAppSelector((state) => state.auth.userProfile);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photoUrl: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "orders">("personal");

  // --- handlers and effects ---
  useEffect(() => {
    if (!firebaseUser && !userProfile) return;
    setForm((prev) => ({
      ...prev,
      name: userProfile?.name ?? firebaseUser?.displayName ?? "",
      email: userProfile?.email ?? firebaseUser?.email ?? "",
      phone: userProfile?.phone ?? "",
      address: userProfile?.address ?? "",
      photoUrl: userProfile?.photoUrl ?? "",
    }));
  }, [firebaseUser, userProfile]);

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
      if (!firebaseUser) {
        throw new Error("No user");
      }

      const trimmedName = form.name.trim();
      const trimmedPhone = form.phone.trim();
      const trimmedAddress = form.address.trim();

      // 1) Update in Firestore
      await updateUserProfile({
        uid: firebaseUser.uid,
        data: {
          name: trimmedName,
          phone: trimmedPhone || "",
          address: trimmedAddress || "",
          photoUrl: form.photoUrl,
        },
      });

      // Update displayName in Firebase Auth (if it has changed)
      const auth = getAuth();
      const realUser = auth.currentUser;

      if (realUser && realUser.displayName !== trimmedName) {
        await updateAuthProfile(realUser, {
          displayName: trimmedName,
        });
      }

      // Update Redux auth state (userProfile + firebaseUser)
      function serializeUserProfile(profile: typeof userProfile) {
        return profile
          ? {
              ...profile,
              name: trimmedName,
              phone: trimmedPhone || undefined,
              address: trimmedAddress || undefined,
              createdAt:
                profile.createdAt &&
                typeof profile.createdAt !== "number" &&
                typeof profile.createdAt.toMillis === "function"
                  ? profile.createdAt.toMillis()
                  : profile.createdAt ?? null,
              updatedAt:
                profile.updatedAt &&
                typeof profile.updatedAt !== "number" &&
                typeof profile.updatedAt.toMillis === "function"
                  ? profile.updatedAt.toMillis()
                  : profile.updatedAt ?? null,
            }
          : null;
      }

      dispatch(
        setAuthState({
          firebaseUser: {
            ...firebaseUser,
            displayName: trimmedName,
          },
          userProfile: serializeUserProfile(userProfile),
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
    if (!e.target.files || e.target.files.length === 0 || !firebaseUser) return;

    const file = e.target.files[0];
    setIsUploadingPhoto(true);
    setError(null);
    setSuccess(null);

    try {
      // Upload the photo to Firebase Storage
      const fileExt = file.name.split(".").pop() || "jpg";
      const photoRef = ref(
        storage,
        `users/${firebaseUser.uid}/profile.${fileExt}`
      );

      await uploadBytes(photoRef, file);
      const downloadUrl = await getDownloadURL(photoRef);

      // Save photoUrl in Firestore
      await updateUserProfile({
        uid: firebaseUser.uid,
        data: { photoUrl: downloadUrl },
      });

      // Update the local form
      setForm((prev) => ({
        ...prev,
        photoUrl: downloadUrl,
      }));

      // Update Redux userProfile
      function serializeUserProfilePhoto(profile: typeof userProfile) {
        return profile
          ? {
              ...profile,
              photoUrl: downloadUrl,
              createdAt:
                profile.createdAt &&
                typeof profile.createdAt !== "number" &&
                typeof profile.createdAt.toMillis === "function"
                  ? profile.createdAt.toMillis()
                  : profile.createdAt ?? null,
              updatedAt:
                profile.updatedAt &&
                typeof profile.updatedAt !== "number" &&
                typeof profile.updatedAt.toMillis === "function"
                  ? profile.updatedAt.toMillis()
                  : profile.updatedAt ?? null,
            }
          : null;
      }

      dispatch(
        setAuthState({
          firebaseUser,
          userProfile: serializeUserProfilePhoto(userProfile),
        })
      );

      setSuccess("Профилната снимка беше обновена.");
    } catch (err) {
      console.error(err);
      setError("Нещо се обърка при качването на снимката.");
    } finally {
      setIsUploadingPhoto(false);
      // Clear the input to allow selecting the same file again
      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(setAuthState({ firebaseUser: null, userProfile: null }));
      navigate("/");
    } catch {
      setError("Logout failed. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!firebaseUser) {
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

      if (!currentUser) {
        throw new Error("No current user in auth");
      }

      // Delete from Firestore / Firebase Auth
      await deleteUserProfileDoc(firebaseUser.uid);

      // Delete the user from Firebase Auth
      await deleteUser(currentUser);

      // Clear Redux state locally
      dispatch(
        setAuthState({
          firebaseUser: null,
          userProfile: null,
        })
      );

      // Redirect to the home page (or a goodbye page 😅)
      navigate("/");
    } catch (err: unknown) {
      console.error(err);

      // Проверяваме за често срещания случай: requires recent login
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
  return (
    <PageWrapper>
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
            error={error}
            success={success}
            handleChange={handleChange}
            handleSave={handleSave}
            handlePhotoChange={handlePhotoChange}
            firebaseUser={firebaseUser}
          />
          <LogoutWrapper>
            <AppButton
              type="button"
              onClick={handleLogout}
              $variant="secondary"
            >
              Изход от профила
            </AppButton>
          </LogoutWrapper>
          <DangerZoneSection onDelete={handleDeleteAccount} />
        </>
      )}
      {activeTab === "orders" && <OrdersSectionComponent />}
    </PageWrapper>
  );
};

export default MyProfilePage;
