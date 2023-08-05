import React from 'react';
import Typography from '@mui/material/Typography';
import PageHeader from "../../../../atoms/PageHeader";
import {FormattedMessage} from "react-intl";
import {Button} from "@mui/material";
import CustomTextField from "../../../../atoms/CustomTextField";
import {makeStyles} from "@mui/styles";
import Card from "@mui/material/Card";
import api from "../../../../../api/apiService";


export const languageList = [
    {code: 'fr', label: 'FR'},
    {code: 'en', label: 'EN'},
    {code: 'mg', label: 'MG'},
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
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        marginTop: '20px',

    },
    fieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
}));

const AddCategory: React.FC = () => {
    const [formData, setFormData] = React.useState<FormData>({
        name: {
            fr: '',
            en: '',
            mg: '',
        },
        description: {
            fr: '',
            en: '',
            mg: '',
        },
    });

    const classes = useStyles();

    const isFormValid = () => {
        // Check if any required field is empty
        return (
            Object.values(formData.name).every((value) => value.trim() !== '') &&
            Object.values(formData.description).every((value) => value.trim() !== '')
        );
    };

    // add to db
    const handleSubmit = async () => {
        const formDataToSend = {
            name: formData.name,
            description: formData.description,
        }

        const response = api.post('/productCategory', formDataToSend);

        console.log(response);
    }


    return (
        <div>
            <PageHeader title={"add_category"} buttonLabel={"return"}/>

            <Card variant={'outlined'} sx={{p: 2}} component="form" className={classes.formContainer}>

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
                                    onChange={(event) => setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        name: {
                                            ...prevFormData.name,
                                            [language.code]: event.target.value,
                                        },
                                    }))}
                                />
                            )}
                        </FormattedMessage>
                    ))}
                </div>
            </Card>

            <Card variant={'outlined'} sx={{p: 2}}
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
                                    onChange={(event) => setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        description: {
                                            ...prevFormData.description,
                                            [language.code]: event.target.value,
                                        },
                                    }))}
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
                    marginTop: '20px',
                }}
                disabled={!isFormValid()}
            >
                <FormattedMessage id={'save'}/>
            </Button>

        </div>
    );
};

export default AddCategory;
