import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

import App from './App.tsx';

import './index.css';

const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    // cookieSecure: window.location.protocol === 'http:'
    cookieSecure: window.location.protocol === 'https:'
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider store={store}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
);
