import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, useUser } from "@auth0/nextjs-auth0";

import QRCode from "react-qr-code";

import Header from "../../../components/header/Header";
import Seo from "../../../components/seo/Seo";
import Loader from "../../../components/loader/Loader";

import { format } from 'date-fns'; 

//Genera i path sulla base dei record
export async function getStaticPaths(ctx) {

    const stripe = require("stripe")(
        `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
    );

    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const results = await stripe.paymentIntents.list({
        customer: stripeId,
    });
    
    const paths = results.data.map((order) => ({
        params: {
          id: order.id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    }
}

  
export default function Post({ data }) {

    const route = useRouter(); 
    const { user } = useUser();

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if(!user) {
            route.push('/api/auth/login'); 
        }
    });

    const deleteReservation = async (id) => {
        try {
            const res = await fetch("/api/airtable/deleteReservation", {
                method: "Delete",
                body: JSON.stringify({ id }),
                headers: { "Content-Type": "application/json" },
            });
            setLoader(true);
            await res.json();
            route.push(`/user/prenotazioni/cancellazione`);
            
        } catch (error) {
            console.error(error);
        }
    };

    if(user) {
        return(
            <div className='column-center-center w-100 h-100'>
                
                <Seo
                    title='Prenotazione  | RistorApp'
                    description='La tua app per ordinare su RistorApp'
                />
    
                <Header />
    
                { loader && <Loader />}
                                
                <main className='w-100 p-20'>
    
                    { data.map((item, idx) => {
                        
                        return(
    
                            <section key={idx} className='column-center-center h-100 pos-rel'>
    
                                <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "120px", width: "100%" }}
                                    value={`https://www.localhost:3000/user/prenotazioni/successo/${item.id}`}
                                    viewBox={`0 0 256 256`}
                                />
    
                                <h2 className="mt-20 mb-20 color-primary font-normal">{item.id}</h2>
                                
                                <div className="mb-20 p-20 card-summary">
                                    
                                    <div className="card-summary-item">
                                        <p>Quando:</p>
                                        <p>{format(new Date(item.date), 'dd/MM/yyyy')}</p>
                                    </div>
                                    <div className="card-summary-item mt-20">
                                        <p>Alle:</p>
                                        <p>{item.time}</p>
                                    </div>
                                    <div className="card-summary-item mt-20">
                                        <p>Per:</p>
                                        <p>{item.reservation} persone</p>
                                    </div>
                                    <div className="card-summary-item mt-20">
                                        <p>Dove:</p>
                                        <p>all'{(item.place == 0) ? 'interno' : 'esterno'}</p>
                                    </div>
    
                                </div>
    
                                <a
                                    className="button-outline"
                                    onClick={() => deleteReservation(item.id)}
                                >
                                    Cancella prenotazione
                                </a>
    
                            </section>
                        );                 
                    })}
                    
                </main>
            </div> 
        );
    }
}