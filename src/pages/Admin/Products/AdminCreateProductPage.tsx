import React from "react";
import { PageTitle } from "../../../components/admin/AdminLayout.styles";
import AdminProductUploader from "../../../components/admin/products/AdminProductUploader";

const AdminCreateProductPage: React.FC = () => {
  return (
    <div>
      <PageTitle>Създаване на нов продукт</PageTitle>
      <p style={{ marginBottom: "1rem" }}>
        Тази форма качва продукта в Firestore и снимките в Storage. Ползвай я
        само като админ.
      </p>

      <AdminProductUploader />
    </div>
  );
};

export default AdminCreateProductPage;
