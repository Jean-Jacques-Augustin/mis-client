import React, { useState, useRef } from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Card,
} from '@mui/material';
import CustomTextField from '../../../atoms/CustomTextField';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import api from '../../../../api/apiService';

const languageList = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'mg', label: 'MG' },
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
    image: string;
    quantity: number;
}

const AddProduct: React.FC = () => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: {
            fr: '',
            en: '',
            mg: '',
        },
        price: 0,
        description: {
            fr: '',
            en: '',
            mg: '',
        },
        category: '',
        image: '',
        quantity: 0,
    });

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [imageURL, setImageURL] = useState<string | null>(null);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedImage(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                // Handle non-image file selection
                alert('Please select an image file.');
            }
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    // ajouter l'url de l'image dans le state
                    setSelectedImage(reader.result as string);
                    console.log(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Handle non-image file drop
                alert('Please drop an image file.');
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const { name, value } = event.target;

        // Check if the field is related to multilingual name or description
        if (name && name.startsWith('name-')) {
            const languageCode = name.split('-')[1];
            setFormData((prevData) => ({
                ...prevData,
                name: {
                    ...prevData.name,
                    [languageCode]: value as string,
                },
            }));
        } else if (name && name.startsWith('description-')) {
            const languageCode = name.split('-')[1];
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

        // Append the form data to the FormData object
        productData.append('name', JSON.stringify(name));
        productData.append('price', price.toString());
        productData.append('description', JSON.stringify(description));
        productData.append('category', category);
        productData.append('quantity', quantity.toString());
        productData.append('image', selectedImage || ''); // Append the image if selected


        console.log(productData);

        try {
            const response = await api.post('/products', productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleOpenFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" align="left">
                        <FormattedMessage id={'name'} />
                    </Typography>
                    <Card variant={'outlined'} sx={{ p: 2 }}>
                        {languageList.map((language) => (
                            <CustomTextField
                                key={language.code}
                                label={`Name (${language.label})`}
                                type="name"
                                name={`name-${language.code}`}
                                value={formData.name[language.code]}
                                onChange={handleChange}
                                required
                            />
                        ))}
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" align="left">
                        <FormattedMessage id={'description'} />
                    </Typography>
                    <Card variant={'outlined'} sx={{ p: 2 }}>
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
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price.toString()}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={(event) =>
                                handleChange(event as React.ChangeEvent<{ name?: string; value: unknown }>)
                            }
                        >
                            <MenuItem value="category1">Category 1</MenuItem>
                            <MenuItem value="category2">Category 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleOpenFileInput}
                        style={{
                            border: '2px dashed #aaa',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            minHeight: '150px',
                            position: 'relative',
                        }}
                    >
                        {selectedImage ? (
                            <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        ) : (
                            <p>Click or drag and drop to select an image.</p>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            style={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity.toString()}
                        onChange={handleChange}
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant={'h6'} align={'left'}>
                        * <FormattedMessage id={'required'} />
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddProduct;
