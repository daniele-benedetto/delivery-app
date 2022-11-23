import { UserProvider } from '@auth0/nextjs-auth0';
import { StateContext } from '../utils/reservation/Context';
import 'bootstrap/dist/css/bootstrap.css';
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

