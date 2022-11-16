import DatePicker from 'react-datepicker';
import {  setHours, setMinutes, format, addDays, addMonths } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';

export default function Calendar({
    form,
    setForm,
    restaurantOption
}) {

    const [selectDate, setSelectDate] = useState(addDays(new Date(), 1));

    //Al cambio della data aggiorno il valore dell'oggetto form
    useEffect(() => {

        setForm({ 
            ...form, 
            date: format(selectDate, 'yyyy-MM-dd'),
            time: format(selectDate, 'hh:mm')
        });
        
    }, [selectDate]);
    
    //Genero gli orari sulla base dei dati del ristorante
    const generateTimetables = () => {
    
        let timetables = [];
    
        restaurantOption.openTime.map(time => {
            timetables.push(setHours(setMinutes(new Date(), time.minute), time.hour));
        });
    
        return timetables;

    }

    return (
        <>
            <DatePicker
                selected={selectDate}
                onChange={(date) => {
                    setSelectDate(date);
                }}
                excludeDates={[addDays(new Date(), 0), addDays(new Date(), 0)]}                
                includeTimes={generateTimetables()}
                showTimeSelect
                timeIntervals={30}
                inline
                minDate={new Date()}
                maxDate={addMonths(new Date(), 6)}
            />
        </>
    );
}
