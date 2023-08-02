import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {IntlProvider, IntlConfig} from 'react-intl';
import ReactDOM from 'react-dom';

// for the language to be used in the app
import fr from './locale/fr.json';
import en from './locale/en.json';
import mg from './locale/mg.json';

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
            return en; // Use English as the default language
    }
}

const languageFromPathname = getShortLocaleFromPathname(window.location.pathname);
const messages = getMessagesFromShortLocale(languageFromPathname);

ReactDOM.render(
    <React.StrictMode>
        <IntlProvider locale={languageFromPathname} messages={messages as Record<string, string>}>
            <BrowserRouter
                basename={`/${languageFromPathname}`}
            >
                <App/>
            </BrowserRouter>
        </IntlProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
