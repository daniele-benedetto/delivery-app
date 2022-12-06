import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import formatMoney from "../../utils/FormatMoney";

import Header from "../../components/header/Header";
import Seo from "../../components/seo/Seo";
import Loader from "../../components/loader/Loader";

import homeImage from '../../assets/images/food-confirm.svg';
import { orders } from "../../utils/Airtable";

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

    const [ loader, setLoader ] = useState(false);

    const addOrder = async () => {

        let products = [];

        order.line_items.data.map(item => {
            const product = new Object();
            product.name = item.description;
            product.qty = item.quantity;
            products.push(product)
        })

        try {         
            const res = await fetch("/api/airtable/createOrder", {
                method: "POST",
                body: JSON.stringify({
                    name: order.customer_details.name,
                    email: order.customer_details.email,
                    products: JSON.stringify(products),
                    address: order.customer_details.address.line1, 
                    delivery: order.metadata.delivery, 
                    date: order.metadata.date, 
                    time: order.metadata.time,
                    total: formatMoney(order.amount_total)
                }),
                prova: orders,
                headers: { "Content-Type": "application/json" },
            });
                            
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