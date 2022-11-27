import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

import Header from "../components/header/Header";
import Seo from "../components/seo/Seo";


export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {

        const session = getSession(ctx.req, ctx.res);
        const user = session.user.sub;

        return { props: { user: user } };
    },
});

export default function Prenotazioni({user}) {

    if(user) {

        return (
            <div className='column-center-center w-100 h-100'>
            
                <Seo
                    title='Template | RistorApp'
                    description='La tua app per ordinare su RistorApp'
                />

                <Header />
                                
                <main className='w-100 p-20'>

                    <section className='column-center-center h-100 pos-rel'>
                        PROFILO UTENTE
                    </section>
                </main>
            </div> 
        );
    }
}