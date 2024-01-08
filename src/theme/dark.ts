import {createTheme} from "@mui/material";

/**
 * The dark theme.
 */
const darkTheme = createTheme({
    typography: {
        fontFamily: ["Salsa", "Helvetica", "Arial", "sans-serif"].join(","),
    },

    palette: {
        mode: "dark",
        primary: {
            main: "#2196f3",
            light: "#6ec6ff",
            dark: "#0069c0",
        },
        secondary: {
            main: "#e91e63",
            light: "#ff6090",
            dark: "#b0003a",
        },
        background: {
            default: "#5893df",
            paper: "#24344d",
        },
    },
});

export default darkTheme;
