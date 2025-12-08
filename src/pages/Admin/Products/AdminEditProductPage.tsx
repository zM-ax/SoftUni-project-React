import React from "react";
import { useParams } from "react-router-dom";
import { PageTitle } from  "../../../components/admin/AdminLayout.styles";

const AdminEditProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <PageTitle>Редакция на продукт</PageTitle>
      <p>
        Тук ще зареждаме данните за продукта с ID:{" "}
        <strong>{productId}</strong> и ще показваме форма за редакция.
      </p>
      <p>
        Следващата стъпка е да префакторираме формата за създаване, за да може
        да работи и в режим „редакция“.
      </p>
    </div>
  );
};

export default AdminEditProductPage;
