import { UserProvider } from '@auth0/nextjs-auth0';
import { StateContext } from '../utils/Context';

import '../styles/globals.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <StateContext>
                <Component {...pageProps} />
            </StateContext>
        </UserProvider>
    );
}

