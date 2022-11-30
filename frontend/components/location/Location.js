import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";

import { FiNavigation } from 'react-icons/fi';
  
export default function Location() {

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });
  
    //Al cambio dell'input setta il valore di ricerca
    const searchAddress = (e) => {
        setValue(e.target.value);
    };
  
    const handleSelect = ({ description }) =>

        () => {

            // Quando l'utente seleziona un luogo, possiamo sostituire la parola chiave senza richiedere dati dall'API
            // impostando il secondo parametro su "false"
            setValue(description, false);
            clearSuggestions();
    
            //Richiediamo i dati di geolocalizzazione
            getGeocode({ address: description }).then((results) => {
                //Qui posso svolgere delle azioni a risultato avvenuto
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
            <small className="text-left">Inserisci il tuo indirizzo e verifica se possia effetuare la consegna</small>
            <div className="input-container mb-20">

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
        </>

    );
};
