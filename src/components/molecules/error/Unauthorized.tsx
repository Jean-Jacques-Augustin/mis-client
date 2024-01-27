import {Box} from "@mui/material";

export default function Unauthorized() {
    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <h1>
                401 Unauthorized
            </h1>
        </Box>
    )
}