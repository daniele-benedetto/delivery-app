import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useStateContext } from "../../utils/Context";

import { AiFillPlusCircle, AiFillMinusCircle} from 'react-icons/ai';

import Seo from '../../components/seo/Seo';
import Loader from "../../components/loader/Loader";

import {BiLeftArrowAlt} from 'react-icons/bi';
import { products } from "../../utils/Airtable";

import Cart from "../../components/cart/Cart";

//Genera i path sulla base dei record
export async function getStaticPaths() {

    const results = await products.select({
        view: "ViewGrid",
    }).all();

    const paths = results.map(({ id }) => ({
        params: {
          id: id
        },
    }));

    return {
        paths,
        fallback: false,
    }
}

//Richiamo il record e genero i campi
export async function getStaticProps({ params: {id}}) {

    const results = await products.select({
        view: "ViewGrid",
        filterByFormula: `{id} = '${id}'`
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
    
    return data;
}

export default function Prodotto({ data }) {

    const route = useRouter(); 
    const [loader, setLoader] = useState(false);

    const { 
        qty, 
        incrementQty, 
        decrementQty,
        onAdd,
        setQty,
    } = useStateContext();

    useEffect(() => {
        setQty(1);
    }, []);

    const reset = () => {
        setLoader(true);
        route.push('/ordina');    
    }

    const product = data[0];

    return (

        <div className='column-center-center w-100 h-100'>
            
            <Seo 
                title={`${product.name} | ristoApp`}
                description={`Ordina la miglior ${product.name} online`}
            />

            {loader && <Loader /> }

                                
            <main className='w-100 p-20'>

                <section className='column-center-center h-100 pos-rel'>

                    <BiLeftArrowAlt 
                        size={30}
                        color={'var(--black)'}
                        className='button-reset'
                        onClick={reset}
                    />

                    <Cart />

                    <div className='column-center-center p-20 w-100 pos-rel'>
                        <p>{product.name}</p>
                        <span>Quantità</span>
                        <button onClick={decrementQty}><AiFillMinusCircle /></button>
                        <p>{qty}</p>
                        <button onClick={incrementQty}><AiFillPlusCircle /></button>
                    </div>

                    <button onClick={() => {console.log(product); onAdd(product, qty)}} >Aggiungi al carrello</button>

                </section>
            </main>
        </div>         
    );
}