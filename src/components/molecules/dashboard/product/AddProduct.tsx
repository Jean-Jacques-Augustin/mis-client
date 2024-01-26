import React, { useState, useRef } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  Snackbar,
} from "@mui/material";
import CustomTextField from "../../../atoms/CustomTextField";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";
import api from "../../../../api/apiService";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import PageHeader from "../../../atoms/PageHeader";
import { useGetAllCategoryQuery } from "../../../../store/apiSlice";
import CircularProgress from "@mui/material/CircularProgress";

const languageList = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "mg", label: "MG" },
];

interface ProductFormData {
  name: {
    [key: string]: string;
  };
  price: number;
  description: {
    [key: string]: string;
  };
  category: string;
  quantity: number;
}

const AddProduct: React.FC = () => {
  const locale = useIntl().locale;
  // get the Category list
  const { data: categories, isLoading, error } = useGetAllCategoryQuery();

  const [formData, setFormData] = useState<ProductFormData>({
    name: { fr: "", en: "", mg: "" },
    price: 0,
    description: { fr: "", en: "", mg: "" },
    category: "", // Make sure category is initialized as a string
    quantity: 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;

    // Check if the field is related to multilingual name or description
    if (name && name.startsWith("name-")) {
      const languageCode = name.split("-")[1];
      setFormData((prevData) => ({
        ...prevData,
        name: {
          ...prevData.name,
          [languageCode]: value as string,
        },
      }));
    } else if (name && name.startsWith("description-")) {
      const languageCode = name.split("-")[1];
      setFormData((prevData) => ({
        ...prevData,
        description: {
          ...prevData.description,
          [languageCode]: value as string,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name as string]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { name, price, description, category, quantity } = formData;

    // Create a new FormData object
    const productData = new FormData();

    // Convert the name and category fields to JSON and append to the FormData
    productData.append("name[fr]", name.fr);
    productData.append("name[en]", name.en);
    productData.append("name[mg]", name.mg);
    productData.append("category", category);
    productData.append("description[fr]", description.fr);
    productData.append("description[en]", description.en);
    productData.append("description[mg]", description.mg);
    productData.append("quantity", quantity.toString());
    productData.append("price", price.toString());
    if (image) {
      productData.append("image", image as Blob);
    }

    console.log("productData", productData);

    try {
      const response = await api.post("/products", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")} `,
        },
      });
      showSnackbar("Product created successfully", "success");
    } catch (error) {
      console.error(error);
      showSnackbar("An error occurred. Please try again later.", "error");
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      // Handle non-image file selection
      alert("Please select an image file.");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      // Handle non-image file drop
      alert("Please drop an image file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return <div>Error: {"message" in error ? error.message : "Erreur"}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader title={"add_product"} buttonLabel={"return"} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' align='left'>
            <FormattedMessage id={"name"} />
          </Typography>
          <Card variant={"outlined"} sx={{ p: 2 }}>
            {languageList.map((language) => (
              <CustomTextField
                key={language.code}
                label={`Name (${language.label})`}
                type='name'
                name={`name-${language.code}`}
                value={formData.name[language.code]}
                onChange={handleChange}
                required
              />
            ))}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' align='left'>
            <FormattedMessage id={"description"} />
          </Typography>
          <Card variant={"outlined"} sx={{ p: 2 }}>
            {languageList.map((language) => (
              <CustomTextField
                key={language.code}
                label={`Description (${language.label})`}
                name={`description-${language.code}`}
                value={formData.description[language.code]}
                onChange={handleChange}
                required
                multiline={true}
              />
            ))}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label='Price'
            name='price'
            type='number'
            value={formData.price.toString()}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name='category'
              value={formData.category}
              onChange={(event) =>
                handleChange(
                  event as React.ChangeEvent<{
                    name?: string;
                    value: unknown;
                  }>
                )
              }
            >
              <MenuItem value='category1'>Sans catégorie</MenuItem>
              {categories.data.map((category: any) => (
                <MenuItem value={category._id}>
                  {category.description[locale]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: "2px dashed #aaa",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              minHeight: "150px",
              position: "relative",
            }}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt='Selected Image'
                className='w-full mx-auto mb-2'
              />
            ) : (
              <p className='text-gray-500'>
                Drag and drop an image here or click to select an image
              </p>
            )}
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label='Quantity'
            name='quantity'
            type='number'
            value={formData.quantity.toString()}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant={"h6"} align={"left"}>
            * <FormattedMessage id={"required"} />
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert elevation={6} variant='filled' severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

export default AddProduct;
