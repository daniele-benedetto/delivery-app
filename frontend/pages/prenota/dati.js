import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0';

import { useStateContext } from "../../utils/reservation/Context";

import Seo from '../../components/seo/Seo';
import Link from "next/link";
import Button from "../../components/form/button/Button";
import Select from "../../components/form/select/Select";

import { placeData } from "../api/local";

export default function Dati() {
        
    const { 
        form,
        setForm,
        formError,
        setFormError,
        placesNumber,
        setPlacesNumber,
        placesInsideNumber,
        placesOutsideNumber,
    } = useStateContext();

    const route = useRouter(); 
    const { user } = useUser();

    let placesSelect = new Object();
    let placesArray = []; 
    
    //Generazione dinamica del numero di posti disponibili
    const generatePlacesNumberOption = (value) => {

        setPlacesNumber(value)

        let index = 0;
        let i = 0;
        let number = [];

        //Genero un array contentente il singoli posti disponili
        while (index < placesNumber){
            index++
            number.push(index);
        }
        
        //Ciclo i singoli posti per generare un array di oggetti
        //L'array di oggetti sarà la variabile che passerò al select
        //per generare le singole opzioni
        for (i=1; i<=number.length; i++){
            placesSelect = new Object();
            placesSelect['id'] = i;
            placesSelect['time'] = i;
            placesArray.push(placesSelect);
        }

    }

    const generatePlaceSelect = () => {
        if(form.place == '0') {
            generatePlacesNumberOption(placesInsideNumber);    
        } else if(form.place == '1') {
            generatePlacesNumberOption(placesOutsideNumber);
        } else {
            generatePlacesNumberOption(0);
        }
        return (
            <Select
                id='reservation'
                label='Per quante persone vuoi prenotare?'
                values={placesArray}
                onChange={(event) => {
                    const val = event.target.value;
                    setForm({ ...form, reservation: val });
                }}
                error={formError.reservation}
            />
        );
    }   
    
    //Controlla disponibilità
    const checkData = () => {

        if(form.place && form.reservation) {
            route.push('./riassunto');
        } 

        //Verifica se ci sono errori nella compilazione di questi campi
        setFormError({
            ...formError,
            place: form.place === "",
            reservation: form.reservation === "",
        });    

    };
    
    //Pulisco tutti i campi del form
    const reset = () => {

        setForm({
            ...form,
            date: "",
            time: "",
            meal: "", //0 => pranzo, 1 => cena
            place: "", //0 => interno, 1 => esterno
            reservation: "",
        });

        route.push('./calendario');
        
    }

    if(user) {
        return (

            <div className={`container-fluid p-0`}>
            
                <Seo 
                    title='Prenota dati | RistorApp'
                    description='La tua app per ordinare su RistorApp'
                />

                <button onClick={() => route.push("/api/auth/logout")}>ESCI</button>
            
                <main className={`container-fluid`}>
                    <div className={`row`}>
                        <section className={`border col-12 vh-100 d-flex flex-wrap justify-content-center align-items-center p-0`}>
                            <div className={`container border d-flex justify-content-center flex-column`}>
                                <div>
                                    <pre>
                                        <code>{JSON.stringify(form, undefined, 2)} Totale: {placesNumber} Dentro: {placesInsideNumber} Fuori: {placesOutsideNumber}</code>
                                    </pre>
                                </div>

                                <Button
                                    onClick={reset}
                                    text='Reset'
                                />

                                <Select
                                    id='place'
                                    label='Scegli il luogo'
                                    values={placeData}
                                    onChange={(event) => {
                                        const val = event.target.value;
                                        setForm({ ...form, place: val });
                                        () => generatePlaceSelect;
                                    }}
                                    error={formError.place}
                                />

                                { generatePlaceSelect() }

                                <Button
                                    onClick={checkData}
                                    text='Verifica disponibilità'
                                />

                            </div>
                        </section>
                    </div>
                </main>
            </div>         
        );
    } else {
        return (
            <Link href='/api/auth/login'>Accedi</Link>
        );
    }
}



    
