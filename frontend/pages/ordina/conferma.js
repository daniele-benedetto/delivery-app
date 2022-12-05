import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Header from "../../components/header/Header";
import Seo from "../../components/seo/Seo";
import Loader from "../../components/loader/Loader";

import homeImage from '../../assets/images/food-confirm.svg';

const stripe = require("stripe")(
    `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
  
export async function getServerSideProps(params) {
    const order = await stripe.checkout.sessions.retrieve(
        params.query.session_id,
        {
            expand: ["line_items"],
        }
    );
    return { props: { order } };
}

export default function Conferma({order}) {

    console.log(order)

    const [ loader, setLoader ] = useState(false);

    const addOrder = async () => {

        try {         
            const res = await fetch("/api/airtable/createOrder", {
                method: "POST",
                body: JSON.stringify({
                    name: order.customer_details.name,
                    email: order.customer_details.email,
                    products: 'test',
                    address: order.customer_details.address.line1, 
                    delivery: '1', 
                    date: '2022-02-14', 
                    time: '12.30',
                    total: order.amount_total
                }),
                headers: { "Content-Type": "application/json" },
            });
                    
            const result = await res.json();

            console.log(result)
        
        } catch (error) {
                console.error(error);
        }
    };

    return (
        <div className='column-center-center w-100 h-100'>

            <Seo 
                title='Conferma ordinato | RistorApp'
                description='Grazie per aver ordinato, segui il tuo ordine'
            />

            <Header />

            { loader && <Loader /> }

            <main className='w-100 p-20'>
                    <section className='column-center-center h-100 pos-rel'>
                        
                        <Image
                            width={250}
                            height={250}
                            src={homeImage} 
                            alt='Ordina a casa tua' 
                        />

                        <h1 className="font-middle font-semibold w-100">Grazie per aver <b className="color-primary">ordinato</b></h1>
                        <h2 className="font-small mb-40">Tieni monitorato la tua ordinazione</h2>

                        <button onClick={addOrder}>test salva ordine</button>

                        <Link onClick={() => setLoader(true)} className='button-primary' href='/'>Segui ordine</Link>

                    </section>
            </main>
        </div>
    );
}