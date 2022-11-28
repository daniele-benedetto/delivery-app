import { useRouter } from "next/router";
import { useState } from "react";

import Seo from '../../components/seo/Seo';
import Loader from "../../components/loader/Loader";

import {BiLeftArrowAlt} from 'react-icons/bi';
import { products } from "../../utils/Airtable";

//Genera i path sulla base dei record
export async function getStaticPaths() {
    const results = await products.select({
        view: "ViewGrid",
    }).all();

    const paths = results.map(({ id }) => ({
        params: {
          id: id
        },
    }));

    console.log(paths)

    return {
        paths,
        fallback: false,
    }
}

//Richiamo il record e genero i campi
export async function getStaticProps({ params: {id}}) {

    const results = await products.select({
        view: "ViewGrid",
        filterByFormula: `{id} = '${id}'`
    }).all();

    const data = {
        props: {
              data: results.map(result => {
                return {
                    id: result.id,
                    ...result.fields,
                }
            })
        }
    }
    
    return data;
}

export default function Prodotto({ data }) {

    const route = useRouter(); 
    const [loader, setLoader] = useState(false);

    const reset = () => {
        setLoader(true);
        route.push('/ordina');    
    }

    return (

        <div className='column-center-center w-100 h-100'>
            
            <Seo 
                title={`${data[0].name} | ristoApp`}
                description={`Ordina la miglior ${data[0].name} online`}
            />

            {loader && <Loader /> }

                                
            <main className='w-100 p-20'>

                <section className='column-center-center h-100 pos-rel'>

                    <BiLeftArrowAlt 
                        size={30}
                        color={'var(--black)'}
                        className='button-reset'
                        onClick={reset}
                    />

                    <div className='column-center-center p-20 w-100 pos-rel'>
                        Singolo prodotto
                    </div>

                </section>
            </main>
        </div>         
    );
}