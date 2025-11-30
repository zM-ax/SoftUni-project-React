import React, { useState } from "react";
import {
  UploaderContainer,
  UploaderTitle,
  FieldWrapper,
  Label,
  Input,
  Textarea,
  Select,
  Button,
  LogList,
} from "./TemporaryProductUploader.styles";
import { uploadProduct } from "../../services/db/myProducts";

const TemporaryProductUploader: React.FC = () => {
  const [smallImageFile, setSmallImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);

  const [product, setProduct] = useState({
    title: "",
    type: "dessert" as "dessert" | "cake",
    price: 0,
    quantity: 1,
    weight: "",
    shortDescription: "",
    longDescription: "",
    extraInfo: "",
    ingredientsText: "",
    ingredients: [] as string[],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setField = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSmallImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSmallImageFile(file);
  };

  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGalleryFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!smallImageFile) {
      alert("Моля, изберете малка снимка за HomePage.");
      return;
    }

    setIsUploading(true);
    setLog([]);

    const ingredientsArr = product.ingredientsText
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    const baseData = {
      title: product.title,
      type: product.type,
      price: product.price,
      quantity: product.quantity,
      weight: product.weight,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      extraInfo: product.extraInfo,
      ingredients: ingredientsArr,
      rating: 0,
      reviewsCount: 0,
      showOnHomepage: false,
      homepageOrder: 0,
      isActive: true,
    };

    try {
      const results = await uploadProduct(
        smallImageFile,
        galleryFiles,
        baseData
      );

      const newLog = results.map((res) =>
        res.status === "success"
          ? `+ ${res.fileName} — ${res.message}`
          : `- ${res.fileName} — ${res.message}`
      );

      setLog(newLog);

      //reset only if all successful
      if (results.every((res) => res.status === "success")) {
        setProduct({
          title: "",
          type: "dessert",
          price: 0,
          quantity: 1,
          weight: "",
          shortDescription: "",
          longDescription: "",
          extraInfo: "",
          ingredientsText: "",
          ingredients: [],
        });

        setSmallImageFile(null);
        setGalleryFiles(null);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <UploaderContainer>
      <UploaderTitle>Temporary Product Uploader</UploaderTitle>

      <FieldWrapper>
        <Label>Име:</Label>
        <Input
          value={product.title}
          onChange={(e) => setField("title", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Вид:</Label>
        <Select
          value={product.type}
          onChange={(e) =>
            setField("type", e.target.value as "cake" | "dessert")
          }
        >
          <option value="dessert">Десерт</option>
          <option value="cake">Торта</option>
        </Select>
      </FieldWrapper>

      <FieldWrapper>
        <Label>Цена:</Label>
        <Input
          value={product.price}
          onChange={(e) => setField("price", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Количество:</Label>
        <Input
          type="number"
          value={product.quantity}
          onChange={(e) => setField("quantity", Number(e.target.value))}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Тегло (грамове):</Label>
        <Input
          value={product.weight}
          onChange={(e) => setField("weight", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Кратко описание:</Label>
        <Input
          value={product.shortDescription}
          onChange={(e) => setField("shortDescription", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Дълго описание:</Label>
        <Textarea
          value={product.longDescription}
          onChange={(e) => setField("longDescription", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Допълнителна информация (съставки, съхранение):</Label>
        <Textarea
          value={product.extraInfo}
          onChange={(e) => setField("extraInfo", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Съставки (разделени със запетая):</Label>
        <Input
          value={product.ingredientsText}
          onChange={(e) => setField("ingredientsText", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Малка снимка (за HomePage):</Label>
        <Input type="file" accept="image/*" onChange={handleSmallImageChange} />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Допълнителни снимки (за ProductPage):</Label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryFilesChange}
        />
      </FieldWrapper>

      <Button disabled={isUploading} onClick={handleUpload}>
        {isUploading ? "Качване..." : "Потвърди"}
      </Button>

      {log.length > 0 && (
        <LogList>
          {log.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </LogList>
      )}
    </UploaderContainer>
  );
};

export default TemporaryProductUploader;
