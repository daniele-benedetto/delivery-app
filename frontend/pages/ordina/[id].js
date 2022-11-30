import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useStateContext } from "../../utils/Context";

import { AiFillPlusCircle, AiFillMinusCircle} from 'react-icons/ai';

import Seo from '../../components/seo/Seo';
import Loader from "../../components/loader/Loader";

import {BiLeftArrowAlt} from 'react-icons/bi';
import { products } from "../../utils/Airtable";

import styles from '../../styles/Order.module.css';

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
    const ingredients = product.ingredients.toString().replaceAll(',', ', ');

    return (

        <div className='column-center-center w-100 h-100'>
            
            <Seo 
                title={`${product.name} | ristoApp`}
                description={`Ordina la miglior ${product.name} online`}
            />

            {loader && <Loader /> }

                                
            <main className='w-100 p-20'>

                <section className='column-center-top h-100 pos-rel'>
                    
                    <BiLeftArrowAlt 
                        size={30}
                        color={'var(--black)'}
                        className='button-reset'
                        onClick={reset}
                    />

                    <div className='column-center-center w-100 pos-rel mt-40'>
                        <img width={'100%'} src={product.image[0].thumbnails.full.url} alt={product.name} />
                        <div className="mt-20">
                            <h2 className="font-bold font-middle">{product.name}</h2>
                            <p>{ingredients}</p>
                        </div>
                        <div className={styles.productButton}>
                            <button className="button-order" onClick={decrementQty}>
                                <AiFillMinusCircle 
                                    size={25}
                                />
                            </button>
                            <p className="m-0 p-10 font-bold">{qty}</p>
                            <button className="button-order" onClick={incrementQty}>
                                <AiFillPlusCircle 
                                    size={25}
                                />
                            </button>
                        </div>
                    </div>

                    <button className="button-primary button-primary-product justify-content-center" 
                        onClick={() => {
                            setLoader(true);
                            onAdd(product, qty);
                            route.push('/ordina');
                        }} 
                    > Aggiungi per {(product.price * qty).toFixed(2)}€
                    </button>

                </section>
            </main>
        </div>         
    );
}