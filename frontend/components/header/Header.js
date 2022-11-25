import Link from "next/link";
import { useState } from "react";
import styles from '../../styles/Header.module.css';

import Menu from "./Menu";

import { GiHamburgerMenu } from 'react-icons/gi';
import { GrRestaurant } from 'react-icons/gr';

export default function Header() {

    const [classMenu, setClassMenu] = useState(false);
    return (
        <header className={`${styles.header} w-100 row-between-center p-20 font-semibold`}>
            
            <Link href="/" className="color-primary font-normal">
                <GrRestaurant 
                    size={30}
                    color={'var(--color-primary)'}
                />
            </Link>

            <GiHamburgerMenu 
                size={20}
                color={'var(--black)'}
                onClick={() => setClassMenu(!classMenu)}
            />

            <Menu 
                classMenu={classMenu ? 'menu-open' : ''}
                setClassMenu={setClassMenu}
            />

        </header>
    );
}