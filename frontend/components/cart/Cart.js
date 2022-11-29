import { useState } from 'react';
import { useStateContext } from '../../utils/Context';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';

import styles from '../../styles/Cart.module.css';
import getStripe from '../../utils/Stripe';

export default function Cart() {

    const { 
        cartItems, 
        onAdd, 
        totalQty,
        onRemove,
        totalPrice,
    } = useStateContext();

    const [classMenu, setClassMenu] = useState(false);

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
        <>

            <AiOutlineShoppingCart 
                className={styles.cartIcon}
                size={30}
                color={'var(--black)'}
                onClick={() => setClassMenu(!classMenu)}
            />  

            { totalQty > 0 && 
                <span className={styles.cartNumber}>{totalQty}</span>
            }

            <nav className={`${styles.menu} ${classMenu ? 'menu-open' : ''}` }> 
                <ul className={`${styles.menuContainer} pos-rel w-100`}>

                    {cartItems.map(((cart, idx) => {
                        return(
                            <li key={idx}>{cart.name}</li>
                        );
                    }))}

                </ul>

                <GrFormClose 
                    size={30}
                    color={'var(--black)'}
                    onClick={() => setClassMenu(!classMenu)}
                />  
                
                {cartItems.length >= 1 &&
                    <div>
                        <h3>Subtotal: {totalPrice}€</h3>
                        <button onClick={handleCheckout}>Purchase</button>
                    </div>
                } 

            </nav>
        </>      
    );
}