import React, { useState } from "react";
import {
  UploaderContainer,
  UploaderTitle,
  FieldWrapper,
  Label,
  Input,
  Textarea,
  Select,
  CheckboxRow,
  Button,
  LogList,
} from "./TemporaryProductUploader.styles";
import { uploadProduct } from "../../services/db/myProducts";

const TemporaryProductUploader: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const [product, setProduct] = useState({
    title: "",
    type: "dessert" as "dessert" | "cake",
    price: "",
    quantity: 1,
    rating: "",
    weight: "",
    shortDescription: "",
    longDescription: "",

    ingredientsText: "",
    ingredients: [] as string[],

    showOnHomepage: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setField = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files || !files.length) {
      alert("Моля изберете поне една снимка.");
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
      rating: product.rating,
      weight: product.weight,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      ingredients: ingredientsArr,
      showOnHomepage: product.showOnHomepage,
    };

    try {
      const results = await uploadProduct(files, baseData);

      const newLog = results.map((res) =>
        res.status === "success"
          ? `O ${res.fileName} — ${res.message}`
          : `X ${res.fileName} — ${res.message}`
      );

      setLog(newLog);
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
          onChange={(e) => setField("type", e.target.value as "cake" | "dessert")}
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
        <Label>Рейтинг:</Label>
        <Input
          value={product.rating}
          onChange={(e) => setField("rating", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Тегло:</Label>
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
        <Label>Съставки (разделени със запетая):</Label>
        <Input
          value={product.ingredientsText}
          onChange={(e) => setField("ingredientsText", e.target.value)}
        />
      </FieldWrapper>

      <CheckboxRow>
        <input
          type="checkbox"
          checked={product.showOnHomepage}
          onChange={(e) => setField("showOnHomepage", e.target.checked)}
        />
        <span>Показвай в HomePage</span>
      </CheckboxRow>

      <FieldWrapper>
        <Label>Изберете снимки:</Label>
        <Input type="file" accept="image/*" multiple onChange={handleFiles} />
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
