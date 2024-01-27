import {Box, CircularProgress} from "@mui/material";

interface LoadingPageProps {
    size?: "small" | "medium" | "large";
}

export default function LoadingPage({size = "medium"}: LoadingPageProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: getHeigth(size),
            }}
        >
            <CircularProgress size={getSize(size)} thickness={4} color="primary" disableShrink/>
        </Box>
    );
}

// Helper function to map size prop to CircularProgress size value
const getSize = (size: "small" | "medium" | "large" = "medium"): number => {
    switch (size) {
        case "small":
            return 40;
        case "medium":
            return 75;
        case "large":
            return 100;
        default:
            return 75;
    }
};

const getHeigth = (size: "small" | "medium" | "large" = "medium"): string => {
    switch (size) {
        case "small":
            return "30vh"
        case "large":
            return "100vh"
        default:
            return "50vh"
    }
}
