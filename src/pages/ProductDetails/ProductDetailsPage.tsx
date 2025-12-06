// src/pages/ProductDetailsPage/ProductDetailsPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store/root";
import {
  fetchProductById,
  clearCurrentProduct,
} from "../../store/productsSlice";
import { STATUS } from "../../constants/statuses";

import {
  DetailsWrapper,
  BackButton,
  TopSection,
  LeftColumn,
  RightColumn,
  ImageWrapper,
  Image,
  GalleryGrid,
  GalleryImage,
  Title,
  SubTitle,
  InfoRow,
  PriceMain,
  MetaItem,
  QuantityRow,
  QuantityLabel,
  QuantityButton,
  QuantityValue,
  DateLabel,
  DateInput,
  AddToCartButton,
  AccordionsSection,
  AccordionItem,
  AccordionHeader,
  AccordionTitle,
  AccordionBody,
  Message,
} from "./ProductDetailsPage.styles";

const EUR_TO_BGN = 1.95583;

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((state) => state.user);

  const {
    items: products,
    currentProduct,
    currentStatus,
    currentError,
  } = useAppSelector((state: RootState) => state.products);

  const [openSection, setOpenSection] = useState<
    "description" | "storage" | null
  >("description");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  // Product from already loaded list (if coming from ProductsPage)
  const productFromList = products.find((p) => p.id === id);
  // this will be used everywhere below
  const effectiveProduct = productFromList || currentProduct;

  // if not found in the list -> fetch by id
  useEffect(() => {
    if (!id) return;

    if (productFromList) {
      // we already have it locally, no need to fetch
      return;
    }

    dispatch(fetchProductById(id));
  }, [dispatch, id, productFromList]);

  // clear currentProduct when leaving the page
  useEffect(() => {
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const renderPrice = (price: unknown) => {
    const num = typeof price === "number" ? price : Number(price);
    if (Number.isNaN(num)) return "-";
    return num.toFixed(2);
  };

  const isLoading = currentStatus === STATUS.LOADING;
  const hasError = currentStatus === STATUS.FAILED;

  if (!id) {
    return <Message>Невалиден адрес на продукта.</Message>;
  }

  if (hasError) {
    return (
      <DetailsWrapper>
        <Message>
          {currentError || "Грешка при зареждането на продукта."}
        </Message>
        <BackButton type="button" onClick={goBack}>
          Назад
        </BackButton>
      </DetailsWrapper>
    );
  }

  if (isLoading) {
    return (
      <DetailsWrapper>
        <BackButton type="button" onClick={goBack}>
          ← Назад към продуктите
        </BackButton>
        <TopSection style={{ minHeight: 400 }}>
          <LeftColumn style={{ minHeight: 320 }}>
            <ImageWrapper>
              <Image
                src="/placeholder.png"
                alt="Зареждане..."
                style={{ opacity: 0.5 }}
              />
            </ImageWrapper>
            <GalleryGrid>
              <GalleryImage
                src="/placeholder.png"
                alt="Зареждане..."
                style={{ opacity: 0.3 }}
              />
              <GalleryImage
                src="/placeholder.png"
                alt="Зареждане..."
                style={{ opacity: 0.3 }}
              />
            </GalleryGrid>
          </LeftColumn>
          <RightColumn style={{ minHeight: 320 }}>
            <Title
              style={{
                background: "#eee",
                height: 32,
                borderRadius: 8,
                marginBottom: 12,
              }}
            />
            <SubTitle
              style={{
                background: "#eee",
                height: 20,
                borderRadius: 8,
                marginBottom: 12,
              }}
            />
            <InfoRow
              style={{
                background: "#f7f3ef",
                height: 48,
                borderRadius: 16,
                marginBottom: 16,
              }}
            />
            <QuantityRow>
              <QuantityLabel>Количество</QuantityLabel>
              <QuantityButton>−</QuantityButton>
              <QuantityValue>1</QuantityValue>
              <QuantityButton>+</QuantityButton>
            </QuantityRow>
            <DateLabel>Избери дата за взимане/доставка</DateLabel>
            <DateInput />
            <AddToCartButton>Добавяне към количката</AddToCartButton>
            <AccordionsSection>
              <AccordionItem>
                <AccordionHeader>
                  <AccordionTitle>Описание</AccordionTitle>
                  <span>+</span>
                </AccordionHeader>
              </AccordionItem>
            </AccordionsSection>
          </RightColumn>
        </TopSection>
      </DetailsWrapper>
    );
  }

  if (!effectiveProduct) {
    return (
      <DetailsWrapper>
        <Message>Не откривам такъв продукт.</Message>
        <BackButton type="button" onClick={goBack}>
          Назад
        </BackButton>
      </DetailsWrapper>
    );
  }

  const {
    title,
    longDescription,
    shortDescription,
    extraInfo,
    price,
    quantity: boxQuantity,
    weight,
    singleSmallImageUrl,
    imageUrls = [],
    type,
  } = effectiveProduct;

  const handleDecrease = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    // TODO: Create add to cart functionality
    console.log(userRedux);
    // console.log("Add to cart:", {
    //   productId: effectiveProduct.id,
    //   quantity,
    //   selectedDate,
    // });
  };

  const toggleSection = (section: "description" | "storage") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <DetailsWrapper>
      <BackButton type="button" onClick={goBack}>
        ← Назад към продуктите
      </BackButton>

      <TopSection>
        <LeftColumn>
          <ImageWrapper>
            <Image src={singleSmallImageUrl} alt={title} />
          </ImageWrapper>

          {imageUrls.length > 0 && (
            <GalleryGrid>
              {imageUrls.map((url) => (
                <GalleryImage key={url} src={url} alt={title} />
              ))}
            </GalleryGrid>
          )}
        </LeftColumn>

        <RightColumn>
          <Title>{title}</Title>

          {shortDescription && <SubTitle>{shortDescription}</SubTitle>}

          <InfoRow>
            Цена:
            <PriceMain>
              {`${renderPrice(price)} лв. ( ${`${renderPrice(
                (typeof price === "number" ? price : Number(price)) / EUR_TO_BGN
              )} € )`} `}
            </PriceMain>
          </InfoRow>

          <InfoRow>
            {type === "dessert" && typeof boxQuantity === "number" && (
              <MetaItem>{boxQuantity} бр. в кутия</MetaItem>
            )}
          </InfoRow>

          <InfoRow>
            {weight && <MetaItem>{`Тегло: ${weight} гр.`}</MetaItem>}
          </InfoRow>

          <QuantityRow>
            <QuantityLabel>Количество</QuantityLabel>
            <QuantityButton type="button" onClick={handleDecrease}>
              −
            </QuantityButton>
            <QuantityValue>{quantity}</QuantityValue>
            <QuantityButton type="button" onClick={handleIncrease}>
              +
            </QuantityButton>
          </QuantityRow>

          <DateLabel>Избери дата за взимане/доставка</DateLabel>
          <DateInput
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <AddToCartButton type="button" onClick={handleAddToCart}>
            Добавяне към количката
          </AddToCartButton>

          <AccordionsSection>
            {longDescription && (
              <AccordionItem>
                <AccordionHeader onClick={() => toggleSection("description")}>
                  <AccordionTitle>Описание</AccordionTitle>
                  <span>{openSection === "description" ? "−" : "+"}</span>
                </AccordionHeader>
                {openSection === "description" && (
                  <AccordionBody>{longDescription}</AccordionBody>
                )}
              </AccordionItem>
            )}

            {extraInfo && (
              <AccordionItem>
                <AccordionHeader onClick={() => toggleSection("storage")}>
                  <AccordionTitle>Съхранение &amp; сервиране</AccordionTitle>
                  <span>{openSection === "storage" ? "−" : "+"}</span>
                </AccordionHeader>
                {openSection === "storage" && (
                  <AccordionBody>{extraInfo}</AccordionBody>
                )}
              </AccordionItem>
            )}
          </AccordionsSection>
        </RightColumn>
      </TopSection>
    </DetailsWrapper>
  );
};

export default ProductDetailsPage;
