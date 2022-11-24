import { useRouter } from "next/router";
import Image from "next/image";
import { useLayoutEffect } from "react";
import { useStateContext } from "../../utils/reservation/Context";

import { useUser } from '@auth0/nextjs-auth0';

import { placeData } from "../api/local";

import Seo from '../../components/seo/Seo';
import Link from "next/link";
import Button from "../../components/form/button/Button";
import Select from "../../components/form/select/Select";
import Header from "../../components/header/Header";

import { ToastContainer, toast } from 'react-toastify';

import homeImage from '../../assets/images/order-food.svg';

import { BiLeftArrowAlt } from "react-icons/bi";
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';

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

    const notify = () => {
        toast.warning(`Per questa giornata ci sono ${placesInsideNumber} posti all'interno e ${placesOutsideNumber} all'esterno`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };


    useLayoutEffect(() => {
        notify();
    }, []);

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
                placeholder='Per quante persone?'
                values={placesArray}
                onChange={(event) => {
                    const val = event.target.value;
                    setForm({ ...form, reservation: val });
                }}
                error={formError.reservation}
                Icon={BsFillPeopleFill}
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

            <div className='column-center-center w-100 h-100'>
            
                <Seo 
                    title='Prenota dati | RistorApp'
                    description='La tua app per ordinare su RistorApp'
                />

                <Header />

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            
                <main className='w-100 p-20 mt-80 pos-rel'>

                    <BiLeftArrowAlt
                        size={30}
                        color={'var(--black)'}
                        className='button-reset'
                        onClick={reset}
                    />

                    <section className='column-center-center'>

                        <Image
                            width={250}
                            height={250}
                            src={homeImage} 
                            alt='Ordina a casa tua' 
                        />

                        <h1 className='font-middle font-semibold'>
                            Servono pochi passaggi con <b className='color-primary font-bold'>RistoApp</b>
                        </h1>
                            
                        <h2 className='font-small mb-20'>
                            Scegli la posizione e indica quante per quante persone
                        </h2>

                        <Select
                            id='place'
                            placeholder='Scegli il luogo'
                            values={placeData}
                            onChange={(event) => {
                                const val = event.target.value;
                                setForm({ ...form, place: val });
                                () => generatePlaceSelect;
                            }}
                            error={formError.place}
                            Icon={FaMapMarkerAlt}
                        />

                        { generatePlaceSelect() }

                        <Button
                            onClick={checkData}
                            text='Verifica disponibilità'
                        />

                        </section>
                </main>
            </div>         
        );
    } else {
        return (
            <Link href='/api/auth/login'>Accedi</Link>
        );
    }
}



    
