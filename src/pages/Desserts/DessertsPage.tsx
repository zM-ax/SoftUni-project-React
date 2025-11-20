import  { useEffect } from "react";
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
} from "./DessertsPage.styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const BGN_TO_EUR = 1.95583;

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
  }, [ dispatch, products.length ]);

  const desserts = products.filter((p) => p.type === "dessert");
  const cakes = products.filter((p) => p.type === "cake");

  const openProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <DessertsPageWrapper>
      {loading && <Message>Зареждам...</Message>}
      {error && <Message>{error}</Message>}

      {!loading && !error && (
        <>
          <Section>
            <SectionTitle>Десерти</SectionTitle>

            <ProductsGrid>
              {desserts.map((p) => (
                <ProductCard key={p.id} onClick={() => openProduct(p.id)}>
                  <ProductImageWrapper>
                    <ProductImage src={p.singleSmallImageUrl} alt={p.title} />
                  </ProductImageWrapper>

                  <ProductContent>
                    <ProductTitle>{p.title}</ProductTitle>
                    <PriceRow>
                      <PriceMain>{p.price.toFixed(2)} лв.</PriceMain>
                      <PriceSecondary>
                        {(p.price / BGN_TO_EUR).toFixed(2)} €
                      </PriceSecondary>
                    </PriceRow>
                  </ProductContent>
                </ProductCard>
              ))}
            </ProductsGrid>
          </Section>

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
                      <PriceMain>{p.price.toFixed(2)} лв.</PriceMain>
                      <PriceSecondary>
                        {(p.price / BGN_TO_EUR).toFixed(2)} €
                      </PriceSecondary>
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
