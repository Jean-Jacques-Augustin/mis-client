import {Box, Container, Grid, Typography} from "@mui/material";
import {FormattedMessage} from "react-intl";

const QuiSommmes = () => {
    return (
        <Box
            sx={{
                backgroundColor: "background.default",
                minHeight: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Container>
                <Typography variant="h5" fontWeight={"700"}>
                    <FormattedMessage id="about" />
                </Typography>
                <br />
                <Typography
                    variant={"body1"}
                    align={"justify"}
                    color="text.secondary">
                    <FormattedMessage id="about_text" />
                </Typography>
            </Container>
        </Box>
    );
};

export default QuiSommmes;
