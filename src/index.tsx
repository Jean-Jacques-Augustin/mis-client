import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import fr from './locale/fr.json';
import en from './locale/en.json';
import mg from './locale/mg.json';
import store from "./store/store";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

function getShortLocaleFromPathname(pathname: string) {
	const [shortLocale] = pathname.slice(1).split('/'); // Extract the language code from the pathname
	return shortLocale;
}

function getMessagesFromShortLocale(shortLocale: string) {
	switch (shortLocale) {
		case 'en':
			return en;
		case 'fr':
			return fr;
		case 'mg':
			return mg;
		default:
			return en;
	}
}

const languageFromPathname = getShortLocaleFromPathname(window.location.pathname);
const messages = getMessagesFromShortLocale(languageFromPathname);

const root = createRoot(document.getElementById('root')!);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<IntlProvider
				locale={languageFromPathname}
				messages={messages as Record<string, string>}
				defaultLocale={"fr"}
			>
				<BrowserRouter basename={`/${languageFromPathname}`}>
					<ThemeProvider theme={theme}>
						<App/>
					</ThemeProvider>
				</BrowserRouter>
			</IntlProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
