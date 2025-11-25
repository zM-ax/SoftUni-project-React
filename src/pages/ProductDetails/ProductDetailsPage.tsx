import React from "react";
import { DetailsContainer, TitleStyled, DescriptionStyled, ImageStyled } from "./ProductDetailsPage.styles";

const ProductDetailsPage: React.FC = () => {
  // TODO: Fetch dessert details by ID from route params
  // Example static data for now
  const dessert = {
    title: "Sample Dessert",
    description: "This is a detailed description of the dessert, including ingredients, preparation, and story.",
    image: "https://via.placeholder.com/400x300.png?text=Dessert+Image"
  };

  return (
    <DetailsContainer>
      <ImageStyled src={dessert.image} alt={dessert.title} />
      <TitleStyled>{dessert.title}</TitleStyled>
      <DescriptionStyled>{dessert.description}</DescriptionStyled>
    </DetailsContainer>
  );
};

export default ProductDetailsPage;
