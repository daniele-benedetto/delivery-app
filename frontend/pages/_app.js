import { UserProvider } from '@auth0/nextjs-auth0';
import { StateContext } from '../utils/Context';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <StateContext>
                <Component {...pageProps} />
            </StateContext>
        </UserProvider>
    );
}

