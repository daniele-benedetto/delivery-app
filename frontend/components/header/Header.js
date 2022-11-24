import Link from "next/link";
import styles from '../../styles/Header.module.css';

import { FaUserAlt } from 'react-icons/fa';

export default function Header() {
    return (
        <header className={`${styles.header} w-100 row-between-center p-40 font-semibold`}>
            <Link href="/" className="color-primary font-normal">
                RistoApp
            </Link>
            <Link href="/">
                <FaUserAlt 
                    size={20}
                    color={'var(--black)'}
                />
            </Link>
        </header>
    );
}