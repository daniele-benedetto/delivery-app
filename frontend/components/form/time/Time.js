import { useEffect, forwardRef } from 'react';

import DatePicker from 'react-datepicker';
import {  setHours, setMinutes, format, addMinutes } from 'date-fns';

import { Validation } from '../validation/Validation';

import {BsFillClockFill} from 'react-icons/bs';

export default function Time({ form, setForm, selectDate, restaurantOption, error, selectTime, setSelectTime }) {
    
    const today = format(new Date(), "yyyy-MM-dd");

    let startLunch  = new Date([today, restaurantOption.openTime.lunch.start]);
    let finishLunch  = new Date([today, restaurantOption.openTime.lunch.finish]);

    let startDinner  = new Date([today, restaurantOption.openTime.dinner.start]);
    let finishDinner  = new Date([today, restaurantOption.openTime.dinner.finish]);

    let slots = [];

    //Al cambio di stato se time non è selezionato setta il form
    useEffect(() => {
        if(selectTime != '') {
            setForm({ 
                ...form, 
                time: format(selectTime, 'H:mm'),
            });
        }
    }, [selectTime]);

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

            let time = setHours(setMinutes(new Date(), minute), hour);
            const now = new Date();

            timetables.push(time);
            
            if( selectDate != '' && time < now && format(selectDate, 'yyyy-MM-dd') == format(now, 'yyyy-MM-dd')) {
                timetables.shift();
            }
        }

        return timetables;

    }

    const CustomInput = forwardRef(({ onClick, value }, ref) => (
        <div className="input-container mb-20">
            <BsFillClockFill size={20} color={'var(--black)'} />
            <input className='w-100 p-10 input-primary' defaultValue={value} onClick={onClick} ref={ref} placeholder='Seleziona un orario'/>
            { error && <Validation errorText="Seleziona l'orario" /> }
        </div>
    ));

    return (
            <DatePicker
                selected={selectTime}
                onChange={(date) => setSelectTime(date)}
                includeTimes={generateTimetables()}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="H:mm"
                customInput={<CustomInput />}
            />
    );
}