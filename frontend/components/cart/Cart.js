import { useState } from 'react';
import { useStateContext } from '../../utils/Context';

import { BsFillCartFill } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';

import styles from '../../styles/Cart.module.css';

export default function Cart() {

    const { 
        cartItems, 
        showCart,
        setShowCart, 
        onAdd, 
        totalQty,
        onRemove,
        totalPrice,
    } = useStateContext();

    const [classMenu, setClassMenu] = useState(false);


    return (
        <>
            <BsFillCartFill 
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
            </nav>
        </>      
    );
}