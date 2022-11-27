import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import Seo from "../../components/seo/Seo";

import { table } from '../../utils/Airtable';

import { BsThreeDots } from 'react-icons/bs';

import homeImage from '../../assets/images/reserved-all.svg';

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

        return (
            <div className='column-center-center w-100 h-100'>
            
                <Seo
                    title='Prenotazioni | RistorApp'
                    description='La tua app per ordinare su RistorApp'
                />

                {loader && <Loader /> }

                <Header />
                                
                <main className='w-100 p-20'>

                    <section className='column-center-center h-100 pos-rel'>

                        <Image
                            width={250}
                            height={250}
                            src={homeImage} 
                            alt='Ordina a casa tua' 
                        />

                        <h1 className='font-middle font-semibold'>
                            Gestisci le tue <b className='color-primary font-bold'>prenotazioni</b>
                        </h1>

                        <div className="mb-20 p-20 card-summary">

                            {data.props.data.map((item, idx) => {
                                return(
                                    <Link key={idx} onClick={() => setLoader(true)} className="card-summary-item card-summary-item-link mt-20 pb-20" href={`./prenotazioni/${item.id}`}>
                                        <p>{item.date} - {item.time}</p>
                                        <BsThreeDots 
                                            size='20'
                                        />
                                    </Link>   
                                );
                            })}

                        </div>
                    </section>
                </main>
            </div> 
        );
    }
}
