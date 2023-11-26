import {createTheme} from "@mui/material";

const light = createTheme({
	typography: {
		fontFamily: [
			"Open Sans",
			"Helvetica",
			"Arial",
			"sans-serif",
		].join(","),
	},
	palette: {
		mode: "light",
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
	},
});

export default light;