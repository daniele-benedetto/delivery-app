import Seo from "../../../components/seo/Seo";

import QRCode from "react-qr-code";

import { table } from "../../../utils/Airtable"
import Header from "../../../components/header/Header";

//Genera i path sulla base dei record
export async function getStaticPaths() {
    const results = await table.select({
        view: "ViewGrid",
        fields: ['date', 'time', 'reservation', 'meal', 'place', 'sub'],
    }).all();

    const paths = results.map(({ id }) => ({
        params: {
          id: id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    }
}
  
//Richiamo il record e genero i campi
export async function getStaticProps({ params: {id}}) {

    const results = await table.select({
        view: "ViewGrid",
        fields: ['id', 'date', 'time', 'reservation', 'meal', 'place'],
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
  
export default function Post({ data }) {

    console

    return(
        <div className='column-center-center w-100 h-100'>
            
            <Seo
                title='Prenotazione | RistorApp'
                description='La tua app per ordinare su RistorApp'
            />

            <Header />
                            
            <main className='w-100 p-20'>

                { data.map((item, idx) => {
                    return(
                        <section key={idx} className='column-center-center h-100 pos-rel'>

                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "80px", width: "100%" }}
                                value={JSON.stringify(item)}
                                viewBox={`0 0 256 256`}
                            />

                            <div className="mb-20 p-20 card-summary mt-40">
                                <p>Quando: il {item.date}</p>
                                <p>Alle: {item.time}</p>                                    <p>Per: {item.reservation} persone</p>
                                <p className="mb-0">Dove: all'{(item.place == 0) ? 'interno' : 'esterno'}</p>
                            </div>    
                        </section>
                    );                 
                })}
                
            </main>
        </div> 
    );
    
  }

