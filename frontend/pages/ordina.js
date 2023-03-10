import { useState } from "react";
import { useStateContext } from "../utils/Context";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";

import Seo from '../components/seo/Seo';
import Loader from "../components/loader/Loader";

import { categories, products } from '../utils/Airtable';

import styles from '../styles/Order.module.css';
import Cart from "../components/cart/Cart";
import Nav from "../components/nav/Nav";

//Verifico l'autenticazione, genero e estraggo i dati da AirTable
export const getServerSideProps = withPageAuthRequired({

    async getServerSideProps(ctx) {

        const session = getSession(ctx.req, ctx.res);
        const user = session.user.sub;

        //Per card singoli prodotti
        const allProducts = await products.select({
            sort: [{
                field: 'categoryName',
            }]
        }).all();

        //Per menù categorie
        const allCategories = await categories.select(({ 
            sort: [{
                field: 'category',
            }]
        })).all();
      
        const data = {
            props: {
                products: allProducts.map(result => {
                    return {
                        id: result.id,
                        ...result.fields,
                    }
                }),
                categories: allCategories.map(result => {
                    return {
                        id: result.id,
                        ...result.fields,
                    }
                }),
            }
        }
      
        return { props: { user: user, data: data, }};
    },
    
});

export default function Ordina({user, data}) {

    const [loader, setLoader] = useState(false);
    
    //Bool apertura/chiusura menù
    const [cart, setCart] = useState(false);

    const { 
        cartItems, 
        totalQty,
        totalPrice,
        delivery,
        setDelivery,
        date,
        setDate,
        time,
        setTime,
    } = useStateContext();

    if(user) {
        return (

            <div className='column-center-center w-100 h-100'>
                
                <Seo 
                    title='Ordina online | RistorApp'
                    description='Ordina i tuoi piatti preferiti'
                />
    
                {loader && <Loader /> }
    
                                    
                <main className='w-100'>

                    <Nav 
                        setLoader={setLoader}
                        categories={data.props.categories}
                        delivery={delivery}
                        setDelivery={setDelivery}
                        date={date}
                        setDate={setDate}
                        time={time}
                        setTime={setTime}
                    />
    
                    <section className='column-center-top pos-rel p-20 mt-120'>

                        <div className='column-center-center w-100 pos-rel'>
                            {data.props.products.map((item, idx) => {
                                return(
                                    <Link id={item.categoryName} className={`${styles.product} text-left p-20`} onClick={() => setLoader(true)} href={`/ordina/${item.id}`} key={idx}>
                                        <div>
                                            <h3 className="font-small">{item.name}</h3>
                                            <span className="font-min">{item.price.toFixed(2)}€</span>
                                        </div>
                                        <Image width={80} height={50} src={item.image[0].thumbnails.small.url} alt={item.name} />
                                    </Link>
                                );
                            })}
                        </div>

                    </section>
    
                    { cartItems.length >= 1 &&
                        <button 
                            className='button-primary button-primary-product'
                            onClick={() => {
                                setCart(!cart);
                            }}
                        >
                            <span>{totalQty}</span>
                            <p className="mb-0 mt-0 text-center">Visualizza il carrello</p>
                            <span>{totalPrice.toFixed(2)}€</span>
                        </button> 
                    } 
    
                    { cart && <Cart setCart={setCart} cart={cart} /> }
    
                </main>
            </div>         
        );
    }
}