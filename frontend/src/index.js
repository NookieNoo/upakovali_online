import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from './App';
import './styles/index.css';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://ea6b0ca8184148529756264be82b2a42@o1145638.ingest.sentry.io/6213245',
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
