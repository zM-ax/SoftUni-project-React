import styled from "styled-components";
import React from "react";
import { PageTitle } from "../../../components/admin/AdminLayout.styles";
import AdminProductUploader from "../../../components/admin/products/AdminProductUploader";
import { AppButton } from "../../../styles/AppButton";
import { useNavigate } from "react-router";

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.7rem;
  position: relative;

  > button {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  > h1 {
    flex: 1;
    text-align: center;
    margin: 0;
  }
`;
const AdminCreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderRow>
        <AppButton $variant="text" onClick={() => navigate(-1)}>
          ← Назад
        </AppButton>
        <PageTitle as="h1">Създаване на нов продукт</PageTitle>
      </HeaderRow>
      <p style={{ marginBottom: "1rem" }}>
        Тази форма качва продукта в Firestore и снимките в Storage. Ползвай я
        само като админ.
      </p>

      <AdminProductUploader />
    </div>
  );
};

export default AdminCreateProductPage;
