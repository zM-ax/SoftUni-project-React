import React from "react";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../../components/admin/AdminLayout.styles";
import { AppButton } from "../../../styles/AppButton";

const AdminProductsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/admin/products/new");
  };

  return (
    <div>
      <PageTitle>Продукти</PageTitle>

      <div style={{ marginBottom: "1rem" }}>
        <AppButton type="button" onClick={handleCreate}>
          + Нов продукт
        </AppButton>
      </div>

      <p>
        TODO: Списък с продукти, възможност за редакция и изтриване.
      </p>
    </div>
  );
};

export default AdminProductsPage;
