import Image from "next/image";
import Link from "next/link";

import homeImage from '../../assets/images/order-food.svg';

export default function Hero() {
    return (
        <section className='column-center-center'>

            <Image 
                width={300}
                height={300}
                src={homeImage} 
                alt='Immagine home page' 
                className='mb-20'
            />

            <div className='column-center-center p-20'>

                <h1 className='font-big font-semibold'>
                    Get your Delivery<br />at <b className='color-primary font-bold'>Doorstep</b>
                </h1>

                <h2 className='font-small mb-20'>
                    Home delivery and online reservation system<br />for restaurants and cafè
                </h2>

                <Link className='button-primary' href='./prenota'>Ordina online</Link>
                <Link className='button-outline' href='./prenota'>Prenota un tavolo</Link>
                
            </div>

        </section>
    );
}