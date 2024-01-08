import {createTheme} from "@mui/material";

/*
 * The light theme.
 */
const light = createTheme({
    typography: {
        fontFamily: ["Salsa", "Helvetica", "Arial", "sans-serif"].join(","),
    },
    palette: {
        mode: "light",
        primary: {
            main: "#FBD636",
            // light: "#6ec6ff",
            // dark: "#0069c0",
        },
        secondary: {
            main: "#e91e63",
            light: "#ff6090",
            dark: "#b0003a",
        },
    },
});

export default light;
