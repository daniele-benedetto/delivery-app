import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useState } from "react";

import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import Seo from "../../components/seo/Seo";

import { table } from '../../utils/Airtable';

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {

        const session = getSession(ctx.req, ctx.res);
        const user = session.user.sub;
    
        const results = await table.select({
            view: "ViewGrid",
            fields: ['date', 'time', 'reservation', 'meal', 'place', 'sub'],
            filterByFormula: `{sub} = '${user}'`
        }).all();
      
        const data = {
          props: {
                data: results.map(result => {
                    return {
                        id: result.id,
                        ...result.fields,
                    }
                })
            }
        }

        return { props: { user: user, data: data } };
    },
});

export default function Prenotazioni({user, data}) {

    const [loader, setLoader] = useState(false);

    if(user) {

        console.log(data);

        return (
            <div className='column-center-center w-100 h-100'>
            
                <Seo
                    title='Prenota calendario | RistorApp'
                    description='La tua app per ordinare su RistorApp'
                />

                {loader && <Loader /> }

                <Header />
                                
                <main className='w-100 p-20'>

                    <section className='column-center-center h-100 pos-rel'>

                        {data.props.data.map((item, idx) => {
                            return(
                                <div key={idx}>
                                    <Link href={`./prenotazioni/${item.id}`}>{item.date} - {item.time}</Link>
                                </div>
                            );
                        })}

                    </section>
                </main>
            </div> 
        );
    }
}
