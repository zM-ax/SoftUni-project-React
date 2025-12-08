import React, { useEffect, useState } from "react";
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
} from "./AdminProductUploader.styles";
import {
  uploadProduct,
  updateProductByIdAsync,
} from "../../../services/db/myProducts";
import type { ProductType } from "../../../types/products";

type AdminProductUploaderProps = {
  mode?: "create" | "edit";
  initialProduct?: ProductType | null;
  productId?: string;
  onSuccess?: () => void;
};

const emptyState = {
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
};

const AdminProductUploader: React.FC<AdminProductUploaderProps> = ({
  mode = "create",
  initialProduct,
  productId,
  onSuccess,
}) => {
  const [smallImageFile, setSmallImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);

  const [product, setProduct] = useState(emptyState);
  const [isUploading, setIsUploading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  // Инициализиране на формата при edit mode
  useEffect(() => {
    if (mode === "edit" && initialProduct) {
      setProduct({
        title: initialProduct.title ?? "",
        type: initialProduct.type,
        price: Number(initialProduct.price) || 0,
        quantity: initialProduct.quantity ?? 1,
        weight: initialProduct.weight ?? "",
        shortDescription: initialProduct.shortDescription ?? "",
        longDescription: initialProduct.longDescription ?? "",
        extraInfo: initialProduct.extraInfo ?? "",
        ingredientsText: (initialProduct.ingredients || []).join(", "),
        ingredients: initialProduct.ingredients || [],
      });
    }

    if (mode === "create") {
      setProduct(emptyState);
      setSmallImageFile(null);
      setGalleryFiles(null);
      setLog([]);
    }
  }, [mode, initialProduct]);

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

  const handleSubmit = async () => {
    if (mode === "create" && !smallImageFile) {
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
      showOnHomepage: false,
      homepageOrder: 0,
      isActive: true,
      // rating и reviewsCount не ги пипаме при edit (updateDoc ще остави старите)
      ...(mode === "create"
        ? {
            rating: 0,
            reviewsCount: 0,
          }
        : {}),
    };

    try {
      if (mode === "create") {
        const results = await uploadProduct(
          smallImageFile as File, // вече сме проверили, че го има
          galleryFiles,
          baseData
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newLog = results.map((res: any) =>
          res.status === "success"
            ? `+ ${res.fileName} — ${res.message}`
            : `- ${res.fileName} — ${res.message}`
        );

        setLog(newLog);

        // reset само ако всички са success
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (results.every((res: any) => res.status === "success")) {
          setProduct(emptyState);
          setSmallImageFile(null);
          setGalleryFiles(null);

          if (onSuccess) {
            onSuccess();
          }
        }
      } else {
        if (!productId) {
          alert("Липсва productId за редакция на продукта.");
          return;
        }

        await updateProductByIdAsync(productId, baseData);
        setLog([`+ Продуктът беше обновен успешно.`]);

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.error("Грешка при запис на продукта", err);
      setLog(["- Възникна грешка при записа на продукта."]);
    } finally {
      setIsUploading(false);
    }
  };

  const isEdit = mode === "edit";

  return (
    <UploaderContainer>
      <UploaderTitle>
        {isEdit ? "РЕДАКЦИЯ НА ПРОДУКТ" : "КАЧВАНЕ НА ПРОДУКТ (АДМИН)"}
      </UploaderTitle>

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
          type="number"
          value={product.price}
          onChange={(e) => setField("price", Number(e.target.value))}
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

      {/* При edit не задължаваме да се сменя снимката, но позволяваме */}
      <FieldWrapper>
        <Label>
          Малка снимка (за HomePage){isEdit ? " – по желание" : ""}:
        </Label>
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

      <Button disabled={isUploading} onClick={handleSubmit}>
        {isUploading
          ? isEdit
            ? "Записване..."
            : "Качване..."
          : isEdit
          ? "Запази промените"
          : "Потвърди"}
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

export default AdminProductUploader;
