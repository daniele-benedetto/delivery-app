import styles from '../../styles/Loader.module.css';
import loader from '../../assets/images/loader.svg';
import Image from 'next/image';
import { GrRestaurant } from 'react-icons/gr';

export default function Loader() {
    return(
        <div className={styles.loader}>
            <GrRestaurant
                size={50}
                fill={'var(--white)'}
                />
            <Image alt="loader" width={300} height={300} src={loader} />
        </div>
    );
}