import React from "react";
import Card from "@mui/material/Card";
import {FormattedMessage} from "react-intl";
import Typography from "@mui/material/Typography";

export interface LandingBoxProps {
    title: string;
    description: string;
    icone: React.ReactNode;
}

const LandingBox: React.FC<LandingBoxProps> = ({title, description, icone}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",

                minHeight: 400,
            }}>
            {icone}
            <Typography variant={"h5"} fontWeight={"700"}>
                <FormattedMessage id={`${title}`} />
            </Typography>
            <Typography variant={"body1"} color="text.secondary">
                <FormattedMessage id={`${description}`} />
            </Typography>
        </Card>
    );
};

export default LandingBox;
