import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

import Seo from '../components/seo/Seo';
import Loader from "../components/loader/Loader";
import Cart from "../components/cart/Cart";

import {BiLeftArrowAlt} from 'react-icons/bi';

import Link from "next/link";

import { products } from '../utils/Airtable';

import homeImage from '../assets/images/food-data.svg';

import styles from '../styles/Order.module.css';

export async function getStaticProps() {
    const results = await products.select({
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


export default function Ordina({data}) {

    const route = useRouter(); 
    const [loader, setLoader] = useState(false);

    const reset = () => {
        setLoader(true);
        route.push('/');    
    }

    return (

        <div className='column-center-center w-100 h-100'>
            
            <Seo 
                title='Ordina online | RistorApp'
                description='Ordina i tuoi piatti preferiti'
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

                    <Image
                        width={250}
                        height={250}
                        src={homeImage} 
                        alt='Ordina a casa tua' 
                    />    

                    <div className='column-center-center w-100 pos-rel'>
                        {data.map((item, idx) => {
                            return(
                                <Link className={styles.product} onClick={() => setLoader(true)} href={`/ordina/${item.id}`} key={idx}>
                                    <div>
                                        <h3>{item.name}</h3>
                                        <span>{item.price.toFixed(2)}€</span>
                                    </div>
                                    <Image width={80} height={50} src={item.image[0].thumbnails.small.url} alt={item.name} />
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>         
    );
}