import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppButton } from "../../../styles/AppButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../../../store/productsSlice";
import { STATUS } from "../../../constants/statuses";
import { deleteProductByIdAsync } from "../../../services/db/myProducts";
import { PageTitle } from "../../../components/admin/AdminLayout.styles";

import {
  TableWrapper,
  StyledTable,
  ThName,
  ThType,
  ThPrice,
  ThHome,
  ThActive,
  ThCreated,
  ThActions,
  TdName,
  TdType,
  TdPrice,
  TdHome,
  TdActive,
  TdCreated,
  TdActions,
} from "./AdminProductPage.styles";
import AppSpinner from "../../../components/AppSpinner";

const formatDate = (value: unknown): string => {
  if (!value) return "-";

  if (typeof value === "number") {
    return new Date(value).toLocaleDateString("bg-BG");
  }

  // Firestore Timestamp { seconds, nanoseconds }
  if (typeof value === "object" && value !== null && "seconds" in value) {
    const timestamp = value as { seconds: number; nanoseconds: number };
    return new Date(timestamp.seconds * 1000).toLocaleDateString("bg-BG");
  }

  return "-";
};

const AdminProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    items: products,
    status,
    error,
  } = useAppSelector((state) => state.products);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleCreate = () => {
    navigate("/admin/products/new");
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/products/${id}/edit`);
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Сигурна ли си, че искаш да изтриеш „${title}“? Тази операция е необратима.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteProductByIdAsync(id);
      dispatch(fetchProducts());
    } catch (err) {
      console.error("Грешка при изтриване на продукт", err);
      alert("Възникна грешка при изтриването на продукта.");
    } finally {
      setDeletingId(null);
    }
  };

  const isLoading = status === STATUS.LOADING;
  const hasError = status === STATUS.FAILED;

  return (
    <div>
      {/* Header + button NEW Product */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        <PageTitle style={{ margin: 0 }}>Продукти</PageTitle>
        <AppButton type="button" onClick={handleCreate}>
          + Нов продукт
        </AppButton>
      </div>

      {isLoading && <AppSpinner>Зареждам продуктите...</AppSpinner>}
      {hasError && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && !hasError && products.length === 0 && (
        <p>Няма създадени продукти.</p>
      )}

      {!isLoading && !hasError && products.length > 0 && (
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <ThName>Име</ThName>
                <ThType>Вид</ThType>
                <ThPrice>Цена</ThPrice>
                <ThHome>На начална</ThHome>
                <ThActive>Активен</ThActive>
                <ThCreated>Създаден</ThCreated>
                <ThActions>Действия</ThActions>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <TdName>{product.title}</TdName>
                  <TdType>
                    {product.type === "dessert" ? "Десерт" : "Торта"}
                  </TdType>
                  <TdPrice>{Number(product.price).toFixed(2)} лв.</TdPrice>
                  <TdHome>{product.showOnHomepage ? "Да" : "Не"}</TdHome>
                  <TdActive>{product.isActive ? "Да" : "Не"}</TdActive>
                  <TdCreated>{formatDate(product.createdAt)}</TdCreated>
                  <TdActions>
                    <AppButton
                      type="button"
                      $variant="text"
                      onClick={() => handleEdit(product.id)}
                    >
                      Редактирай
                    </AppButton>
                    <AppButton
                      type="button"
                      $variant="danger"
                      disabled={deletingId === product.id}
                      onClick={() => handleDelete(product.id, product.title)}
                    >
                      {deletingId === product.id ? "Изтриване..." : "Изтрий"}
                    </AppButton>
                  </TdActions>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      )}
    </div>
  );
};

export default AdminProductsPage;
