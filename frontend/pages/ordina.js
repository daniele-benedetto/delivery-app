import { useRouter } from "next/router";
import { useState } from "react";
import { useStateContext } from "../utils/Context";
import Image from "next/image";
import Link from "next/link";

import { deliveryData } from "./api/local";

import Seo from '../components/seo/Seo';
import Loader from "../components/loader/Loader";
import Select from "../components/form/select/Select";

import { BiLeftArrowAlt } from 'react-icons/bi';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { FaCarSide } from 'react-icons/fa';

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

    const { 
        cartItems, 
        totalQty,
        totalPrice,
        delivery,
        setDelivery
    } = useStateContext();

    const reset = () => {
        setLoader(true);
        setDelivery(0);
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

                    <Select
                        id='delivery'
                        values={deliveryData}
                        onChange={(event) => {
                            const val = event.target.value;
                            setDelivery(val);
                        }}
                        className={'select-delivery'}
                        delivery={delivery}
                        Icon={delivery == 1 ? MdOutlineDeliveryDining : FaCarSide}
                    />

                    <Image
                        className="mt-20"
                        width={250}
                        height={250}
                        src={homeImage} 
                        alt='Ordina a casa tua' 
                    />    

                    <div className='column-center-center w-100 pos-rel mb-80'>
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
            {cartItems.length >= 1 &&
                <button 
                    className='button-primary button-primary-product'
                    onClick={() => {
                        setLoader(true);
                        route.push('/ordina/carrello');
                    }}
                >
                    <span>{totalQty}</span>
                    <p className="mb-0 text-center">Visualizza il carrello</p>
                    <span>{totalPrice.toFixed(2)}€</span>
                </button> 
            } 
        </div>         
    );
}