import Link from "next/link";
import { useRouter } from "next/router";

import { BiLeftArrowAlt } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";

import { deliveryData } from "../../pages/api/local";

import Select from "../form/select/Select";

export default function Nav({setDelivery, delivery, setLoader, categories}) {

    const route = useRouter(); 

    const reset = () => {
        setLoader(true);
        setDelivery(0);
        route.push('/');    
    }

    return(
        <header className="w-100 navigator">

            <BiLeftArrowAlt
                size={30}
                color={'var(--black)'}
                className='button-reset pos-rel'
                onClick={reset}
            />

            <Select
                id='delivery'
                values={deliveryData}
                className='select-delivery'
                onChange={(event) => {
                    const val = event.target.value;
                    setDelivery(val);
                }}
                delivery={delivery}
                Icon={delivery == 1 ? MdOutlineDeliveryDining : FaCarSide}
            /> 

            <ul className="w-100 menu-horizontal">
                {categories.map((category, idx) => {
                    return(
                        <li key={idx}>
                            <Link href={`#${category.category}`}>{category.category}</Link>
                        </li>
                    );                  
                })}
            </ul>

        </header>
    );
} 