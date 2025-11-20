import { useEffect } from "react";
import { fetchProducts } from "../../store/productsSlice";
import { type RootState } from "../../store/root";

import {
  DessertsPageWrapper,
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
} from "./DessertsPage.styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const EUR_TO_BGN = 1.95583;

const DessertsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const desserts = products.filter((p) => p.type === "dessert");
  const cakes = products.filter((p) => p.type === "cake");

  // Helper to safely render price
  const renderPrice = (price: unknown) => {
    const num = typeof price === "number" ? price : Number(price);
    if (isNaN(num)) return "-";
    return num.toFixed(2);
  };

  const openProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <DessertsPageWrapper>
      {loading && <Message>Зареждам...</Message>}
      {error && <Message>{error}</Message>}

      {!loading && !error && (
        <>
        {/* ************************ DESSERTS ************************ */}
          <Section>
            <SectionTitle>Десерти</SectionTitle>

            <ProductsGrid>
              {desserts.map((p) => {
                return (
                  <ProductCard key={p.id} onClick={() => openProduct(p.id)}>
                    <ProductImageWrapper>
                      <ProductImage src={p.singleSmallImageUrl} alt={p.title} />
                    </ProductImageWrapper>

                    <ProductContent>
                      <ProductTitle>{p.title}</ProductTitle>
                      <PriceRow>
                        <PriceMain>
                          {p.price} лв. / {renderPrice(p.price / EUR_TO_BGN)}€
                        </PriceMain>
                      </PriceRow>
                      <BoxInfo>{p.quantity} бр. в кутия</BoxInfo>
                    </ProductContent>
                  </ProductCard>
                );
              })}
            </ProductsGrid>
          </Section>

          {/* ************************ CAKES ************************ */}
          <Section>
            <SectionTitle>Торти</SectionTitle>

            <ProductsGrid>
              {cakes.map((p) => (
                <ProductCard key={p.id} onClick={() => openProduct(p.id)}>
                  <ProductImageWrapper>
                    <ProductImage src={p.singleSmallImageUrl} alt={p.title} />
                  </ProductImageWrapper>

                  <ProductContent>
                    <ProductTitle>{p.title}</ProductTitle>
                    <PriceRow>
                      <PriceMain>
                        {renderPrice( p.price)}
                        лв.
                      </PriceMain>
                      <PriceSecondary>{renderPrice(p.price / EUR_TO_BGN)} €</PriceSecondary>
                    </PriceRow>
                  </ProductContent>
                </ProductCard>
              ))}
            </ProductsGrid>
          </Section>
        </>
      )}
    </DessertsPageWrapper>
  );
};

export default DessertsPage;
