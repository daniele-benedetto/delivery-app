import Link from 'next/link';
import { GrFormClose } from 'react-icons/gr';
import styles from '../../styles/Header.module.css';
import { useUser } from '@auth0/nextjs-auth0';

export default function Menu({classMenu, setClassMenu}) {

    const { user } = useUser();

    return (
        <nav className={`${styles.menu} ${classMenu}` }> 
            <ul className={`${styles.menuContainer} pos-rel w-100`}>
                <li>
                    <Link href='/chi-siamo'>RistoApp</Link>
                </li>
                <li>
                    <Link href='/user/profilo'>Profilo</Link>
                </li>
                <li>
                    <Link href='/user/ordini'>Ordini</Link>
                </li>
                <li>
                    <Link href='/user/prenotazioni'>Prenotazioni</Link>
                </li>
            </ul>
            <GrFormClose 
                size={30}
                color={'var(--black)'}
                onClick={() => setClassMenu(!classMenu)}
            />    
        </nav>
    );
}