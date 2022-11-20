import DatePicker from 'react-datepicker';
import {  setHours, setMinutes, format, addDays, addMonths, addMinutes, getDay } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';
import { Validation } from '../validation/Validation';

export default function Calendar({
    form,
    setForm,
    restaurantOption,
    error
}) {

    const [selectDate, setSelectDate] = useState('');
    
    const today = format(new Date(), "yyyy-MM-dd");

    let startLunch  = new Date([today, restaurantOption.openTime.lunch.start]);
    let finishLunch  = new Date([today, restaurantOption.openTime.lunch.finish]);

    let startDinner  = new Date([today, restaurantOption.openTime.dinner.start]);
    let finishDinner  = new Date([today, restaurantOption.openTime.dinner.finish]);

    let slots = [];

    useEffect(() => {
        if(selectDate != '') {
            setForm({ 
                ...form, 
                date: format(selectDate, 'yyyy-MM-dd'),
                time: format(selectDate, 'H:mm'),
            });
        }
    }, [selectDate]);

    //Filtro i giorni di chiusura
    const isCloseDay = (date) => {
        const day = getDay(date);
        return day !== restaurantOption.closeDays;
      };

    //Genero gli orari sulla base dei dati del ristorante
    const generateTimetables = () => {

        let timetables = [];

        //Ciclo orario di inizio e fine per generare le date
        //Salvo i valori all'interno di un array
        while (startLunch<=finishLunch){
            slots.push(startLunch);
            startLunch = addMinutes(startLunch, 30);
        }
    
        while (startDinner<=finishDinner){
            slots.push(startDinner);
            startDinner = addMinutes(startDinner, 30);
        }

        //Ciclo il nuovo array e ottengo un array
        //di funzioni che generano gli slot del calendario
        for (let i = 0; i < slots.length; i++) {

            let hour = parseInt(format(slots[i], 'H'));
            let minute = parseInt(format(slots[i], 'mm'));

            timetables.push(setHours(setMinutes(new Date(), minute), hour));
        }

        return timetables;

    }

    return (
        <>
            <DatePicker
                selected={selectDate}
                onChange={(date) => {
                    setSelectDate(date);
                }}
                filterDate={isCloseDay}
                excludeDates={[addDays(new Date(), 0), addDays(new Date(), 0)]}                
                includeTimes={generateTimetables()}
                showTimeSelect
                timeIntervals={30}
                inline
                minDate={new Date()}
                maxDate={addMonths(new Date(), 6)}
            />
            { error && <Validation errorText="Seleziona la data e l'ora" /> }
        </>
    );
}
