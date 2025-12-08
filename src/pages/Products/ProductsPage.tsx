// src/pages/ProductsPage/ProductsPage.tsx
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../store/productsSlice";
import type { RootState } from "../../store/root";
import { 
  Section,
  SectionTitle,
  ProductsGrid,
  ProductCard,
  ProductImageWrapper,
  ProductImage,
  ProductContent,
  ProductTitle,
  PriceRow,
  PriceMain,
  PriceSecondary,
  Message,
  BoxInfo,
} from "./ProductsPage.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { STATUS } from "../../constants/statuses";
import { EUR_TO_BGN } from "../../constants/textConstants";
import { AppPageWrapper } from "../../styles/AppPageWrapper";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    items: products,
    status,
    error,
  } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const desserts = useMemo(
    () => products.filter((p) => p.type === "dessert"),
    [products]
  );

  const cakes = useMemo(
    () => products.filter((p) => p.type === "cake"),
    [products]
  );

  const renderPrice = (price: unknown) => {
    const num = typeof price === "number" ? price : Number(price);
    if (Number.isNaN(num)) return "-";
    return num.toFixed(2);
  };

  const openProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  const isLoading = status === STATUS.LOADING;
  const hasError = status === STATUS.FAILED;

  const renderProducts = () => {
    console.time("renderProducts");
    const result = desserts.map((p) => (
      <ProductCard key={p.id} onClick={() => openProduct(p.id)}>
        <ProductImageWrapper>
          <ProductImage
            src={p.singleSmallImageUrl}
            alt={p.title}
            loading="lazy"
          />
        </ProductImageWrapper>
        <ProductContent>
          <ProductTitle>{p.title}</ProductTitle>
          <PriceRow>
            <PriceMain>
              {renderPrice(p.price)} лв. /{" "}
              {renderPrice(
                (typeof p.price === "number" ? p.price : Number(p.price)) /
                  EUR_TO_BGN
              )}
              €
            </PriceMain>
          </PriceRow>
          <BoxInfo>{p.quantity} бр. в кутия</BoxInfo>
        </ProductContent>
      </ProductCard>
    ));
    console.timeEnd("renderProducts");
    return result;
  };

  return (
    <AppPageWrapper>
      {isLoading && <Message>Зареждам...</Message>}
      {hasError && <Message>{error}</Message>}

      {!isLoading && !hasError && (
        <>
          <Section>
            <SectionTitle>Десерти</SectionTitle>
            <ProductsGrid>{renderProducts()}</ProductsGrid>
          </Section>

          <Section>
            <SectionTitle>Торти</SectionTitle>
            <ProductsGrid>
              {cakes.map((p) => (
                <ProductCard key={p.id} onClick={() => openProduct(p.id)}>
                  <ProductImageWrapper>
                    <ProductImage
                      src={p.singleSmallImageUrl}
                      alt={p.title}
                      loading="lazy"
                    />
                  </ProductImageWrapper>
                  <ProductContent>
                    <ProductTitle>{p.title}</ProductTitle>
                    <PriceRow>
                      <PriceMain>{renderPrice(p.price)} лв.</PriceMain>
                      <PriceSecondary>
                        {renderPrice(
                          (typeof p.price === "number"
                            ? p.price
                            : Number(p.price)) / EUR_TO_BGN
                        )}{" "}
                        €
                      </PriceSecondary>
                    </PriceRow>
                  </ProductContent>
                </ProductCard>
              ))}
            </ProductsGrid>
          </Section>
        </>
      )}
    </AppPageWrapper>
  );
};

export default ProductsPage;
