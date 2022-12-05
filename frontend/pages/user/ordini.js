import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";

import Header from "../../components/header/Header";
import Seo from "../../components/seo/Seo";
import Loader from "../../components/loader/Loader";

import formatMoney from "../../utils/FormatMoney";

import { format } from 'date-fns';

import homeImage from '../../assets/images/reserved-all.svg';

const stripe = require("stripe")(
    `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const session = getSession(ctx.req, ctx.res);
        const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
        const paymentIntents = await stripe.paymentIntents.list({
            customer: stripeId,
        });
        return { props: { orders: paymentIntents.data } };
    },
});

export default function Prenotazioni({user, orders}) {

    const [loader, setLoader] = useState(false);

    if(user) {

        return (
            <div className='column-center-center w-100 h-100'>
            
                <Seo
                    title='Ordini | RistorApp'
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
                            
                            { orders.length > 0 && orders.map((order, idx) => {
                                    console.log(order.id)
                                return(
                                    <Link key={idx} onClick={() => setLoader(true)} className="card-summary-item card-summary-item-link mt-20 pb-20" href={`./ordini/${order.id.toString()}`}>
                                        <p>{format((order.created * 1000), 'dd/MM/yyyy')}<br/>{formatMoney(order.amount)}</p>
                                        <BsThreeDots
                                            size='20'
                                        />
                                    </Link>   
                                );
                            })}

                            { orders.length == 0 && <span className="text-center">
                                <MdDateRange 
                                    size={60}
                                    color={'#bbb'}
                                />
                                <h3 className="font-bold font-small">Non hai nuove prenotazioni</h3>
                                <Link className="button-outline" href={'/ordina'}>Ordina adesso</Link>
                            </span> }

                        </div>
                    </section>
                </main>
            </div> 
        );
    }
}