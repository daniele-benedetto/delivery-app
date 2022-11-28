import Link from 'next/link';
import { GrFormClose } from 'react-icons/gr';
import styles from '../../styles/Header.module.css';

export default function Menu({classMenu, setClassMenu}) {

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