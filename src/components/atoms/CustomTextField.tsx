import React from 'react';
import { TextField, Theme } from '@mui/material';
import styled from '@mui/material/styles/styled';

interface CustomTextFieldProps {
    label: any;
    type?: string;
    required?: boolean;
    value: string;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    multiline?: boolean;
}

const CustomTextFieldWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 4,
        backgroundColor: '#fff',
        '& fieldset': {
            borderColor: '#ccc',
        },
        '&:hover fieldset': {
            borderColor: '#aaa',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

const HelperText = styled('div')(({ theme }: { theme: Theme }) => ({
    color: theme.palette.error.main,
    marginTop: 4,
}));

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    label,
    type = 'text',
    onChange,
    value,
    name,
    multiline = false,
    required = false,
}) => {
    return (
        <CustomTextFieldWrapper>
            <TextField
                name={name}
                value={value}
                label={label}
                type={type}
                onChange={onChange}
                fullWidth
                margin="normal"
                variant="outlined"
                rows={multiline ? 4 : 1}
                multiline={multiline}
                required={required}
            />
        </CustomTextFieldWrapper>
    );
};

export default CustomTextField;
