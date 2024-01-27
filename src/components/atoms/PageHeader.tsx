import React from "react";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface PageHeaderProps {
    title: string;
    buttonLabel?: string;
    buttonColor?: ButtonProps["color"];
    buttonOnClick?: () => void;
    to?: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({
                                                   title,
                                                   buttonLabel,
                                                   buttonColor = "primary",
                                                   buttonOnClick,
                                                   to,
                                               }: PageHeaderProps) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
            }}
        >
            <Typography variant="h5" align="left">
                <FormattedMessage id={title} />
            </Typography>

            {buttonOnClick && buttonLabel ? (
                <Button
                    variant="outlined"
                    color={buttonColor}
                    onClick={buttonOnClick}
                    style={{ textTransform: "none" }}
                >
                    {buttonLabel && <FormattedMessage id={buttonLabel} />}
                </Button>
            ) : (
               to && <Link to={to} style={{ textDecoration: "none" }}>
                   <Button
                       variant="outlined"
                       color={buttonColor}
                       style={{ textTransform: "none" }}
                   >
                       {buttonLabel && <FormattedMessage id={buttonLabel} />}
                   </Button>
               </Link>
            )}
        </div>
    );
};

export default PageHeader;
