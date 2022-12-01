import { useRouter } from "next/router";
import { useStateContext } from "../../utils/Context";

import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { toast, ToastContainer } from "react-toastify";

import { FiNavigation } from 'react-icons/fi';
  
export default function Location({setLoader}) {

    const route = useRouter();

    const { 
        setDelivery
    } = useStateContext();

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });

    const notify = () => {
        toast.error(`Possiamo consegnare solo nella città di Modena`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
  
    //Al cambio dell'input setta il valore di ricerca
    const searchAddress = (e) => {
        setValue(e.target.value);
    };
  
    const handleSelect = ({ description }) => () => {

        // Quando l'utente seleziona un luogo, possiamo sostituire la parola chiave senza richiedere dati dall'API
        // impostando il secondo parametro su "false"
        setValue(description, false);
        clearSuggestions();
    
        //Richiediamo i dati di geolocalizzazione
        getGeocode({ address: description }).then((results) => {
            if(results[0].address_components[1].long_name == 'Modena') {
                setLoader(true);
                setDelivery(1);
                route.push('/ordina');    
            } else {
                notify();
            }
        });

    };
  
        //Costruiamo la struttura dei risultati di ricerca
        const renderSuggestions = () => data.map((suggestion) => {
            const { place_id, structured_formatting: { main_text, secondary_text },} = suggestion;
  
            return (
                <li key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );

        });
  
    return (
        <>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCmq_w4Yo_NR8ZzoUOAB3G7kaEexaUTEXE&libraries=places"></script>

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

            <div className="mb-20 mw-350 text-left">
                <small>Inserisci il tuo indirizzo e verifica se possiamo effettuare la consegna</small> 
                <div className="input-container">
                    <input
                        className="input-primary"
                        value={value}
                        onChange={searchAddress}
                        disabled={!ready}
                        placeholder="Inserisci il tuo indirizzo completo"
                    />
  
                    < FiNavigation
                        size={20}
                        color={'var(--black)'}
                    /> 
                    { status === "OK" && <ul className='location'>{renderSuggestions()}</ul> }
                </div>     
            </div>
        </>

    );
};