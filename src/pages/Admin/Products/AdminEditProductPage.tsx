import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProductById, fetchProducts } from "../../../store/productsSlice";
import { STATUS } from "../../../constants/statuses";
import { PageTitle } from "../../../components/admin/AdminLayout.styles";
import { AppButton } from "../../../styles/AppButton";
import AdminProductUploader from "../../../components/admin/products/AdminProductUploader";

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

const AdminEditProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    items: products,
    currentProduct,
    currentStatus,
  } = useAppSelector((state) => state.products);

  // опитваме първо от списъка, после от currentProduct
  const productFromList = products.find((p) => p.id === productId);
  const selectedProduct = productFromList || currentProduct;

  useEffect(() => {
    if (!productId) return;

    // ако нямаме продукта в списъка и не сме го зареждали още → fetch по ID
    if (!productFromList && currentStatus === STATUS.IDLE) {
      void dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, productFromList, currentStatus]);

  if (!productId) {
    return <p>Липсва идентификатор на продукт.</p>;
  }

  if (!selectedProduct || currentStatus === STATUS.LOADING) {
    return <p>Зареждам продукта...</p>;
  }

  const handleSuccess = () => {
    void dispatch(fetchProducts());
    navigate("/admin/products");
  };

  return (
    <div>
      <HeaderRow>
        <AppButton $variant="text" onClick={() => navigate("/admin/products")}>
          ← Назад
        </AppButton>
        <PageTitle as="h1">
          Редакция на продукт: {selectedProduct.title}
        </PageTitle>
      </HeaderRow>

      <p style={{ marginBottom: "1rem" }}>
        Тук можеш да редактираш основната информация за продукта. Снимките са по
        избор – ако не качиш нови, старите ще останат.
      </p>

      <AdminProductUploader
        mode="edit"
        productId={productId}
        initialProduct={selectedProduct}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default AdminEditProductPage;
