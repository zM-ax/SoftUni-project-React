import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/hooks";
import { addItemToCart } from "../../store/cartSlice";
import { EUR_TO_BGN } from "../../constants/textConstants";
import { DeliveryDatePicker } from "../../components/DeliveryDatePicker/DeliveryDatePicker";
import { useProductDetails } from "../../hooks/useProductDetails";
import { useGetUserRedux } from "../../hooks/useGetUser";

import { AppPageWrapper } from "../../styles/AppPageWrapper";
import { AppButton } from "../../styles/AppButton";

import { ErrorMessage } from "../Contacts/ContactsPage.styles";

import { StarRating } from "../../components/starsRating/StarsRating";
import { RatingModal } from "../../components/RatingModal/RatingModal";
import { ReviewCarousel } from "../../components/ReviewCarousel/ReviewCarousel";

import { useProductReviews } from "../../hooks/useProductReviews";
import { createProductReviewAsync } from "../../services/db/productReviews";

import {
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
  ReviewsSection,
  ReviewsHeaderRow,
  ReviewsTitle,
  ReviewsHelperText,
  ReviewsErrorText,
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
  <AppPageWrapper>
    <Message>{message}</Message>
    {onBack && (
      <BackButton type="button" onClick={onBack}>
        Назад
      </BackButton>
    )}
  </AppPageWrapper>
);

// Main page
const ProductDetailsPage = () => {
  const [openSection, setOpenSection] = useState<AccordionKey | null>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState<string | null>(null);

  // rating / reviews UI state
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const userRedux = useGetUserRedux();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { product, isLoading, hasError, error } = useProductDetails(id);

  //Reviews
  const { reviews, isLoadingReviews, reviewsError, reloadReviews } =
    useProductReviews(product?.id);

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
    rating = 0,
    reviewsCount = 0,
  } = product as typeof product & {
    rating?: number;
    reviewsCount?: number;
  };

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

    // TODO: toast / навигация към количката
  };

  const toggleSection = (section: AccordionKey) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const accordionConfig: AccordionConfigItem[] = [
    { key: "description", title: "Описание", content: longDescription },
    { key: "storage", title: "Съхранение & сервиране", content: extraInfo },
  ];

  const handleOpenRating = () => {
    setIsRatingModalOpen(true);
  };

  const handleCloseRating = () => {
    setIsRatingModalOpen(false);
  };

  const handleSubmitRating = async (data: {
    rating: number;
    comment: string;
  }) => {
    if (!product?.id) return;

    setIsSubmittingRating(true);
    try {
      const userId = userRedux?.id || "";

      const userName = userRedux?.name || "Анонимен";

      await createProductReviewAsync({
        productId: product.id,
        userId,
        userName,
        rating: data.rating,
        comment: data.comment,
      });

      reloadReviews();
      setIsRatingModalOpen(false);
    } catch (err) {
      console.error("Error submitting review", err);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <>
      <AppPageWrapper>
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
            {/* Заглавие + рейтинг */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <Title>{title}</Title>

              <span
                onClick={handleOpenRating}
                style={{
                  display: "inline-flex",
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
                role="button"
                tabIndex={0}
                aria-label="Оцени десерта"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleOpenRating();
                }}
              >
                <StarRating
                  value={rating || 0}
                  totalReviews={reviewsCount || 0}
                  showNumber
                />
              </span>
            </div>

            {shortDescription && <SubTitle>{shortDescription}</SubTitle>}

            <InfoRow>
              Цена:
              <PriceMain>
                {renderPrice(price)} лв. (
                {renderPrice(numericPrice / EUR_TO_BGN)} €)
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

            {userRedux?.userType !== "user" && (
              <ErrorMessage>
                Само потребители могат да добавят продукти в количката.
              </ErrorMessage>
            )}

            <AddToCartButton
              type="button"
              onClick={handleAddToCart}
              disabled={userRedux?.userType !== "user"}
            >
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

            {/* ************** REVIEWS SECTION ************** */}
            <ReviewsSection>
              <ReviewsHeaderRow>
                <ReviewsTitle>Мнения за {title}</ReviewsTitle>

                <AppButton
                  type="button"
                  $variant="text"
                  onClick={handleOpenRating}
                >
                  Оцени десерта
                </AppButton>
              </ReviewsHeaderRow>

              {isLoadingReviews && (
                <ReviewsHelperText>Зареждам мненията…</ReviewsHelperText>
              )}

              {reviewsError && (
                <ReviewsErrorText>{reviewsError}</ReviewsErrorText>
              )}

              <ReviewCarousel reviews={reviews} />
            </ReviewsSection>
          </RightColumn>
        </TopSection>
      </AppPageWrapper>

      {/* Модал за оставяне на рейтинг – извън page wrapper-а */}
      {isRatingModalOpen && (
        <RatingModal
          productTitle={title}
          initialRating={5}
          onClose={handleCloseRating}
          onSubmit={handleSubmitRating}
          isSubmitting={isSubmittingRating}
        />
      )}
    </>
  );
};

export default ProductDetailsPage;
