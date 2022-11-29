import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import Seo from "../../components/seo/Seo";

import { table } from '../../utils/Airtable';

import { BsThreeDots } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';

import homeImage from '../../assets/images/reserved-all.svg';

import { format } from 'date-fns';

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {

        const session = getSession(ctx.req, ctx.res);
        const user = session.user.sub;

        const today = format(new Date(), "yyyy-MM-dd");
    
        const results = await table.select({
            view: "ViewGrid",
            fields: ['date', 'time', 'reservation', 'meal', 'place', 'sub', 'state'],
            filterByFormula: `AND({sub} = '${user}', {state} != 1, {date} >= '${today}')`,
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
                            
                            { data.props.data.length > 0 && data.props.data.map((item, idx) => {
                                return(
                                    <Link key={idx} onClick={() => setLoader(true)} className="card-summary-item card-summary-item-link mt-20 pb-20" href={`./prenotazioni/${item.id}`}>
                                        <p>{format(new Date(item.date), 'dd/MM/yyyy')} - {item.time}</p>
                                        <BsThreeDots 
                                            size='20'
                                        />
                                    </Link>   
                                );
                            })}

                            { data.props.data.length == 0 && <span className="text-center">
                                <MdDateRange 
                                    size={60}
                                    color={'#bbb'}
                                />
                                <h3 className="font-bold font-small">Non hai nuove prenotazioni</h3>
                                <Link className="button-outline" href={'/prenota/calendario'}>Prenota adesso</Link>
                            </span> }
                        </div>
                    </section>
                </main>
            </div> 
        );
    }
}
