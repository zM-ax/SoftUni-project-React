import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/hooks";
import { addItemToCart } from "../../store/cartSlice";
import { EUR_TO_BGN } from "../../constants/textConstants";
import { DeliveryDatePicker } from "../../components/deliveryDatePicker/DeliveryDatePicker";
import { useProductDetails } from "../../hooks/useProductDetails";

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
  AddToCartButton,
  AccordionsSection,
  AccordionItem,
  AccordionHeader,
  AccordionTitle,
  AccordionBody,
  Message,
} from "./ProductDetailsPage.styles";

type AccordionKey = "description" | "storage" | "";

interface AccordionConfigItem {
  key: AccordionKey;
  title: string;
  content?: string | null;
}

interface StatusMessageProps {
  message: string;
  onBack?: () => void;
}

const renderPrice = (price: unknown) => {
  const num = typeof price === "number" ? price : Number(price);
  if (Number.isNaN(num)) return "-";
  return num.toFixed(2);
};

const StatusMessage = ({ message, onBack }: StatusMessageProps) => (
  <DetailsWrapper>
    <Message>{message}</Message>
    {onBack && (
      <BackButton type="button" onClick={onBack}>
        Назад
      </BackButton>
    )}
  </DetailsWrapper>
);

// Main page
const ProductDetailsPage = () => {
  const [openSection, setOpenSection] = useState<AccordionKey | null>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { product, isLoading, hasError, error } = useProductDetails(id);

  const goBack = () => navigate(-1);

  if (!id) {
    return <StatusMessage message="Невалиден адрес на продукта." />;
  }

  if (hasError) {
    return (
      <StatusMessage
        message={error || "Грешка при зареждането на продукта."}
        onBack={goBack}
      />
    );
  }

  if (isLoading) {
    return <StatusMessage message="Зареждане на продукта..." onBack={goBack} />;
  }

  if (!product) {
    return (
      <StatusMessage message="Не откривам такъв продукт." onBack={goBack} />
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
  } = product;

  const numericPrice = typeof price === "number" ? price : Number(price ?? 0);

  const handleDecrease = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    if (!selectedDate) {
      setDateError("Моля, избери дата за взимане/доставка.");
      return;
    }

    if (dateError) {
      return;
    }

    if (Number.isNaN(numericPrice)) {
      console.error("Invalid product price", price);
      return;
    }

    dispatch(
      addItemToCart({
        cartItemType: "catalog",
        productId: product.id,
        title,
        imageUrl: singleSmallImageUrl,
        quantity,
        unitPrice: numericPrice,
        selectedDate,
      })
    );

    // TODO: toast / navigation към количката
  };

  const toggleSection = (section: AccordionKey) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const accordionConfig: AccordionConfigItem[] = [
    { key: "description", title: "Описание", content: longDescription },
    { key: "storage", title: "Съхранение & сервиране", content: extraInfo },
  ];

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

          {!!imageUrls.length && (
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
              {renderPrice(price)} лв. ({renderPrice(numericPrice / EUR_TO_BGN)}{" "}
              €)
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

          <DeliveryDatePicker
            selectedDate={selectedDate}
            onSelectedDateChange={setSelectedDate}
            error={dateError}
            onErrorChange={setDateError}
            minDaysAhead={2}
            maxDaysAhead={30}
          />

          <AddToCartButton type="button" onClick={handleAddToCart}>
            Добавяне към количката
          </AddToCartButton>

          <AccordionsSection>
            {accordionConfig.map(({ key, title: label, content }) => {
              if (!content) return null;
              const isOpen = openSection === key;

              return (
                <AccordionItem key={key}>
                  <AccordionHeader onClick={() => toggleSection(key)}>
                    <AccordionTitle>{label}</AccordionTitle>
                    <span>{isOpen ? "−" : "+"}</span>
                  </AccordionHeader>
                  {isOpen && <AccordionBody>{content}</AccordionBody>}
                </AccordionItem>
              );
            })}
          </AccordionsSection>
        </RightColumn>
      </TopSection>
    </DetailsWrapper>
  );
};

export default ProductDetailsPage;
