import Calendar from '../calendar/Calendar';
import Select from '../select/Select';
import Button from '../button/Button';

export default function ReservationFormStepOne({
    form,
    setForm,
    formError,
    setFormError,
    restaurantOption,
    placeData,
    mealData, 
    message,
    setMessage,
    reservationsData,
    setAvailable
}) { 

    //Controlla disponibilità
    const checkAvailability = (e) => {

        e.preventDefault();

        //Quando parte una ricerca setto a 0 i posti riservati e i disponibili
        let reservedSeats= 0;
        let placesAvailable= 0;
    
        if(form.meal && form.date && form.place) {
            //Ciclo tutte le prenotazioni
            //Se sono uguali al giorno, pasto e luogo scelti dall'utente
            //Dichiaro quanti sono i posti già occupati
            reservationsData.map((reservation) => {
                if(
                    reservation.giorno == form.date &&
                    reservation.pasto == form.meal &&
                    reservation.luogo == form.place
                ) {
                    reservedSeats = reservedSeats + reservation.posti;
                }
            });
    
            //Dichiaro che i posti disponibili sono == ai posti disponibili per la locazione interna
            (form.place == 0) 
            ? placesAvailable = restaurantOption.placesAvailableInside 
            : placesAvailable = restaurantOption.placesAvailableOutside;
    
            placesAvailable = placesAvailable - reservedSeats;
                
            //Se ci sono posti disponibili allora dichiaro vero la disponibilità e setto il messaggio
            if (placesAvailable > 0) {
                setAvailable(true);
                setMessage(`Per questa giornata sono disponibili ${placesAvailable} posti`);
            } else {
                setAvailable(false);
                setMessage(`Non ci sono posti disponibili per questa giornata`);
            }
        }
    
        //Verifica se ci sono errori nella compilazione di questi campi
        setFormError({
            ...formError,
            date: form.date === "",
            time: form.time === "",
            meal: form.meal === "",
            place: form.place === "",
        });    
    };

    return(
        
        <form>
            <Calendar
                form={form}
                setForm={setForm}
                formError={formError}
                restaurantOption={restaurantOption}
            />

            <Select
                id='place'
                label='Scegli il luogo'
                values={placeData}
                onChange={(event) => {
                    const val = event.target.value;
                    setForm({ ...form, place: val });
                }}
                error={formError.place}
            />

            <Select 
                id='meal'
                label='Scegli il pasto'
                values={mealData}
                onChange={(event) => {
                    const val = event.target.value;
                        setForm({ ...form, meal: val });
                    }}
                error={formError.meal}
            />

            <Button
                onClick={checkAvailability}
                text='Verifica disponibilità'
            />

            <p>{message}</p>
            
        </form>
    );
}