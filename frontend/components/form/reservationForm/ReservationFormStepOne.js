import Calendar from '../calendar/Calendar';
import Select from '../select/Select';
import Button from '../button/Button';
import { format } from 'date-fns';

export default function ReservationFormStepOne({
    form,
    setForm,
    formError,
    setFormError,
    restaurantOption,
    placeData,
    message,
    setMessage,
    reservationsData,
    setAvailable
}) { 

    //Controlla disponibilità
    const checkAvailability = (e) => {

        e.preventDefault();

        const today = format(new Date(), "yyyy-MM-dd");
        let dateSelect  = new Date([today, form.time]);

        //Quando parte una ricerca setto a 0 i posti riservati e i disponibili
        let reservedSeats= 0;
        let placesAvailable= 0;
    
        if(form.date && form.time && form.place) {

            //Verifico la fascia oraria scelta e se è pranzo o cena
            if(
                format(dateSelect, 'H:mm') >= restaurantOption.openTimeTest.lunch.start && 
                format(dateSelect, 'H:mm') <= restaurantOption.openTimeTest.lunch.finish
            ) {
                setForm({ ...form, meal: 0});
            } else if(
                form.time >= restaurantOption.openTimeTest.dinner.start && 
                form.time <= restaurantOption.openTimeTest.dinner.finish
            ) {
                setForm({ ...form, meal: 1});
            }

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
                setMessage(`Per il giorno ${form.date} alle sono disponibili ${placesAvailable} posti`);
            } else {
                setAvailable(false);
                setMessage(`Non ci sono posti disponibili per questa giornata`);
            }
        }
    
        //Verifica se ci sono errori nella compilazione di questi campi
        setFormError({
            ...formError,
            date: form.date === "",
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
                error={formError.date}
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

            <Button
                onClick={checkAvailability}
                text='Verifica disponibilità'
            />
            
        </form>
    );
}