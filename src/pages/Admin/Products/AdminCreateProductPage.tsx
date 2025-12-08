import {
  HeaderRow,
  PageWrapper,
  InfoText,
  PageTitle,
} from "./AdminCreateProductPage.styles";
import React from "react";

import AdminProductUploader from "../../../components/admin/products/AdminProductUploader";
import { AppButton } from "../../../styles/AppButton";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../store/hooks";
import { fetchProducts } from "../../../store/productsSlice";

const AdminCreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSuccess = () => {
    // refresh product list
    void dispatch(fetchProducts());
  };

  return (
    <PageWrapper>
      <HeaderRow>
        <AppButton $variant="text" onClick={() => navigate(-1)}>
          ← Назад
        </AppButton>
        <PageTitle as="h1">Създаване на нов продукт</PageTitle>
      </HeaderRow>
      <InfoText>
        Тази форма качва продукта в Firestore и снимките в Storage. Ползвай я
        само като админ.
      </InfoText>
      <AdminProductUploader mode="create" onSuccess={handleSuccess} />
    </PageWrapper>
  );
};

export default AdminCreateProductPage;
