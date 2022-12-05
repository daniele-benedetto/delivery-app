import Link from "next/link";
import { useRouter } from "next/router";

import { BiLeftArrowAlt } from "react-icons/bi";

export default function Nav({ setLoader, categories }) {

    const route = useRouter(); 

    const reset = () => {
        setLoader(true);
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

            <ul className="w-100 menu-horizontal mt-20">
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