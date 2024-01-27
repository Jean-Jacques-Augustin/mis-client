import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import PageHeader from "../../../atoms/PageHeader";
import {FormattedMessage} from "react-intl";
import {Button, Card, Snackbar} from "@mui/material";
import CustomTextField from "../../../atoms/CustomTextField";
import {makeStyles} from "@mui/styles";
import MuiAlert from "@mui/material/Alert";
import api from "../../../../api/apiService";

export const languageList = [
    {code: "fr", label: "FR"},
    {code: "en", label: "EN"},
    {code: "mg", label: "MG"},
];

interface LanguageData {
    [key: string]: string;
}

interface FormData {
    name: LanguageData;
    description: LanguageData;
}

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        marginTop: "20px",
    },
    fieldContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
}));

const AddCategory: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: {
            fr: "",
            en: "",
            mg: "",
        },
        description: {
            fr: "",
            en: "",
            mg: "",
        },
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const classes = useStyles();

    const isFormValid = () => {
        return (
            Object.values(formData.name).every((value) => value.trim() !== "") &&
            Object.values(formData.description).every((value) => value.trim() !== "")
        );
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async () => {
        const formDataToSend = {
            name: formData.name,
            description: formData.description,
        };

        try {
            await api.post("/productCategory", formDataToSend);
            setSnackbarMessage("Form submitted successfully!");
            setSnackbarOpen(true);
            window.location.reload();
        } catch (error) {
            console.log(error);
            setSnackbarMessage("Error submitting form. Please try again.");
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <PageHeader title={"add_category"} buttonLabel={"return"}/>

            <Card
                variant={"outlined"}
                sx={{p: 2}}
                component="form"
                className={classes.formContainer}
            >
                <Typography variant="h6" align="left">
                    <FormattedMessage id={"name"}/>
                </Typography>

                <div className={classes.fieldContainer}>
                    {languageList.map((language) => (
                        <FormattedMessage key={language.code} id={"name"}>
                            {(message) => (
                                <CustomTextField
                                    label={`${message} ${language.label}`}
                                    type="name"
                                    name={`name-${language.code}`}
                                    value={formData.name[language.code]}
                                    onChange={(event) =>
                                        setFormData((prevFormData) => ({
                                            ...prevFormData,
                                            name: {
                                                ...prevFormData.name,
                                                [language.code]: event.target.value,
                                            },
                                        }))
                                    }
                                />
                            )}
                        </FormattedMessage>
                    ))}
                </div>
            </Card>

            <Card
                variant={"outlined"}
                sx={{p: 2}}
                component="form"
                className={classes.formContainer}
            >
                <Typography variant="h6" align="left">
                    <FormattedMessage id={"description"}/>
                </Typography>
                <div className={classes.fieldContainer}>
                    {languageList.map((language) => (
                        <FormattedMessage key={language.code} id={"description"}>
                            {(message) => (
                                <CustomTextField
                                    label={`${message} ${language.label}`}
                                    type="description"
                                    name={`description-${language.code}`}
                                    value={formData.description[language.code]}
                                    onChange={(event) =>
                                        setFormData((prevFormData) => ({
                                            ...prevFormData,
                                            description: {
                                                ...prevFormData.description,
                                                [language.code]: event.target.value,
                                            },
                                        }))
                                    }
                                />
                            )}
                        </FormattedMessage>
                    ))}
                </div>
            </Card>

            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                style={{
                    marginTop: "20px",
                }}
                disabled={!isFormValid()}
            >
                <FormattedMessage id={"save"}/>
            </Button>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity="success"
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default AddCategory;
