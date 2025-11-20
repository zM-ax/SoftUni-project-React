import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  updateProfile as updateAuthProfile,
  getAuth,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateUserProfile } from "../../services/db/users";
import { storage } from "../../config/firebase";
import { setAuthState } from "../../store/authSlice";

const MyProfilePage = () => {
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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { firebaseUser, userProfile } = useAppSelector((s) => s.auth);

  // When firebaseUser or userProfile changes, update the form state (Edit functionality)
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

  if (!firebaseUser) {
    // Just in case, but ProfileRoute should protect this page
    return <div>Нямаш достъп до тази страница.</div>;
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setIsSaving(true);

      const updates: { name?: string; phone?: string; address?: string } = {
        name: form.name.trim(),
        phone: form.phone.trim() || "",
        address: form.address.trim() || "",
      };

      await updateUserProfile({
        uid: firebaseUser.uid,
        data: updates,
      });

      // update displayName in Auth
      const realUser = getAuth().currentUser;
      if (realUser && realUser.displayName !== form.name.trim()) {
        await updateAuthProfile(realUser, {
          displayName: form.name.trim(),
        });
      }

      // update Redux auth state to reflect changes locally
      function serializeUserProfile(profile: typeof userProfile) {
        return profile
          ? {
              ...profile,
              name: form.name.trim(),
              phone: form.phone.trim() || undefined,
              address: form.address.trim() || undefined,
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
            displayName: form.name.trim(),
          },
          userProfile: serializeUserProfile(userProfile),
        })
      );

      setSuccess("Промените бяха запазени успешно.");
    } catch (err) {
      console.error(err);
      setError("Нещо се обърка при запазването. Опитай отново.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setError(null);
    setSuccess(null);

    try {
      setIsUploadingPhoto(true);

      const fileExt = file.name.split(".").pop() || "jpg";
      const photoRef = ref(
        storage,
        `users/${firebaseUser.uid}/profile.${fileExt}`
      );

      await uploadBytes(photoRef, file);
      const downloadUrl = await getDownloadURL(photoRef);

      // Записваме URL в Firestore
      await updateUserProfile({
        uid: firebaseUser.uid,
        data: { photoUrl: downloadUrl },
      });

      // Обновяваме локалната форма
      setForm((prev) => ({ ...prev, photoUrl: downloadUrl }));

      // Обновяваме Redux
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
      // чистим input-а, за да може да качиш същия файл пак, ако искаш
      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      dispatch(
        setAuthState({
          firebaseUser: null,
          userProfile: null,
        })
      );
      navigate("/");
    } catch {
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2rem 1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ margin: 0 }}>Моят профил</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.45rem 1.2rem",
            borderRadius: "999px",
            border: "1px solid #d32f2f",
            background: "#fff",
            color: "#d32f2f",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.98rem",
            marginLeft: "1rem",
          }}
        >
          Изход
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Лява колона – снимка */}
        <div style={{ minWidth: "200px" }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #e0e0e0",
              marginBottom: "0.75rem",
            }}
          >
            {form.photoUrl ? (
              <img
                src={form.photoUrl}
                alt="Профилна снимка"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  background: "#f3f3f3",
                  color: "#888",
                }}
              >
                {form.name
                  ? form.name.charAt(0).toUpperCase()
                  : (firebaseUser.email || "?").charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <label
            style={{
              display: "inline-block",
              cursor: "pointer",
              fontSize: "0.9rem",
              padding: "0.4rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid #ccc",
            }}
          >
            {isUploadingPhoto ? "Качване..." : "Смени снимката"}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* Дясна колона – форма */}
        <form
          onSubmit={handleSave}
          style={{ flex: 1, minWidth: "260px", maxWidth: "100%" }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "0.3rem" }}
            >
              Име
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.55rem 0.7rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.3rem" }}
            >
              Имейл
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              disabled
              style={{
                width: "100%",
                padding: "0.55rem 0.7rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                backgroundColor: "#f7f7f7",
              }}
            />
            <small style={{ fontSize: "0.8rem", color: "#777" }}>
              Имейлът се използва за вход и не може да бъде променян тук.
            </small>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="phone"
              style={{ display: "block", marginBottom: "0.3rem" }}
            >
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+359..."
              style={{
                width: "100%",
                padding: "0.55rem 0.7rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label
              htmlFor="address"
              style={{ display: "block", marginBottom: "0.3rem" }}
            >
              Адрес за доставка
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={form.address}
              onChange={handleChange}
              placeholder="гр. София, район..., улица..., блок..., вход..., етаж..."
              style={{
                width: "100%",
                padding: "0.55rem 0.7rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#d32f2f", fontSize: "0.9rem" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "#2e7d32", fontSize: "0.9rem" }}>{success}</p>
          )}

          <button
            type="submit"
            disabled={isSaving}
            style={{
              marginTop: "0.5rem",
              padding: "0.6rem 1.4rem",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {isSaving ? "Запазване..." : "Запази промените"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;
