import {Box, Container, Grid, Typography} from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10vh",
                width: "100%",
                marginTop: "auto",
                backgroundColor: "#c4c4c4",
            }}
        >
            <Container>
                <Typography variant="body2" fontWeight={"600"}>
                    Copyright © {new Date().getFullYear()} - MÍS Epices de Madagascar
                </Typography>
            </Container>
        </Box>
    )
}