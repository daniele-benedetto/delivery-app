import DatePicker from 'react-datepicker';
import {  setHours, setMinutes, format, addDays, addMonths, addMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';

export default function Calendar({
    form,
    setForm,
    restaurantOption
}) {

    const [selectDate, setSelectDate] = useState(addDays(new Date(), 1));

    const today = format(new Date(), "yyyy-MM-dd");

    let startLunch = restaurantOption.openTimeTest.lunch.start;
    let formatStartLunch  = new Date([today, startLunch]);

    let finishLunch = restaurantOption.openTimeTest.lunch.finish;
    let formatFinishLunch  = new Date([today, finishLunch]);

    let startDinner = restaurantOption.openTimeTest.dinner.start;
    let formatStartDinner  = new Date([today, startDinner]);

    let finishDinner = restaurantOption.openTimeTest.dinner.finish;
    let formatFinishDinner  = new Date([today, finishDinner]);

    let array = [];

    while (formatStartLunch<=formatFinishLunch){
        array.push(formatStartLunch);
        formatStartLunch = addMinutes(formatStartLunch, 30);
    }

    while (formatStartDinner<=formatFinishDinner){
        array.push(formatStartDinner);
        formatStartDinner = addMinutes(formatStartDinner, 30);
    }

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

        for (let i = 0; i < array.length; i++) {

            let hour = format(array[i], 'hh');
            let minute = format(array[i], 'mm');

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
