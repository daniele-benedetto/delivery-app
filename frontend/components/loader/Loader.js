import styles from '../../styles/Loader.module.css';
import loader from '../../assets/images/loader.svg';
import Image from 'next/image';

export default function Loader() {
    return(
        <div className={styles.loader}>
            <Image width={200} height={200} src={loader} />
        </div>
    );
}