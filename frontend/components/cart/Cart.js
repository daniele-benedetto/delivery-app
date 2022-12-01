import { useStateContext } from '../../utils/Context';

import { GrCircleAlert, GrFormClose } from 'react-icons/gr';
import { AiFillMinusCircle,AiFillPlusCircle } from 'react-icons/ai';
import { TbShoppingCartX } from 'react-icons/tb';

import styles from '../../styles/Cart.module.css';
import getStripe from '../../utils/Stripe';

export default function Cart({setCart, cart}) {

    const { 
        cartItems, 
        onAdd, 
        onRemove,
        totalPrice,
        delivery
    } = useStateContext();

    const handleCheckout = async () => {
        const stripe = await getStripe();
        const response = await fetch('/api/stripe/stripe', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cartItems),
        });
        const data = await response.json();
        await stripe.redirectToCheckout({sessionId: data.id})
    }

    return (
        <nav className={`${styles.menu} p-20`}> 

            <h3 className='font-bold font-normal mt-10'>Il tuo ordine</h3>

            <ul className={`${styles.menuContainer} pos-rel w-100 mt-20`}>

                { cartItems.length < 1 && 
                    <div className='text-center mt-80'>
                        < TbShoppingCartX size={60} color='#ddd' /> 
                        <h4 className='mt-20 font-small color-grey'>Il carrello è vuoto</h4>
                    </div> 
                }

                { cartItems.map(((cart, idx) => {
                    return(
                        <li className='mb-10' key={idx}>
                            {cart.name}
                            <div className={styles.cartButton}>
                                <button className="button-order" onClick={() => onRemove(cart)}>
                                    <AiFillMinusCircle 
                                        size={15}
                                    />
                                </button>
                                <p className="m-0 p-10 font-bold">{cart.quantity}</p>
                                <button className="button-order" onClick={() => onAdd(cart, 1)}>
                                    <AiFillPlusCircle 
                                        size={15}
                                    />
                                </button>
                            </div>
                        </li>
                        
                    );
                }))}

            </ul>

            <GrFormClose 
                size={30}
                color={'var(--black)'}
                onClick={() => setCart(!cart)}
            />  
                
            {cartItems.length >= 1 && delivery == 1 && <>

                <div className={`${styles.total} mt-20`}>
                    <small>
                        < GrCircleAlert size={15} className='me-2 mb-1' />
                        Hai scelto la consegna a domicilio
                    </small>
                    <div className={`${styles.totalInfo} mt-20`}>
                        <p>Subtotale:</p>
                        <span>{totalPrice.toFixed(2)}€</span>
                    </div>
                    <div className={styles.totalInfo}>
                        <p>Spese di consegna:</p>
                        <span>2.50€</span>
                    </div>
                    <div className={`${styles.totalInfo} font-bold`}>
                        <p>Totale:</p>
                        <span>{(totalPrice + 2.50).toFixed(2)}€</span>
                    </div>
                </div>
                <button 
                    className='button-primary button-primary-product justify-content-center' 
                    onClick={handleCheckout}
                >
                    Vai al pagamento
                </button>

            </> }  

            {cartItems.length >= 1 && delivery == 0 && <>

                <div className={`${styles.total} mt-20`}>
                    <small>
                        < GrCircleAlert size={15} className='me-2 mb-1' />
                        Ritiro previsto alle ore xx:xx
                    </small>
                    <div className={`${styles.totalInfo} font-bold mt-20`}>
                        <p>Totale:</p>
                        <span>{(totalPrice).toFixed(2)}€</span>
                    </div>
                </div>
                <button 
                    className='button-primary button-primary-product justify-content-center' 
                    onClick={handleCheckout}
                >
                    Vai al pagamento
                </button>

            </> }  

        </nav>     
    );
}