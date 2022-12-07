import { useEffect, forwardRef } from 'react';

import DatePicker from 'react-datepicker';
import { format, addMonths, getDay } from 'date-fns';

import { Validation } from '../validation/Validation';

import { BsCalendarDateFill } from 'react-icons/bs';

export default function Calendar({form, setForm, restaurantOption, error, selectDate, setSelectDate, setSelectTime}) {

    //Al cambio di valore setto la data selezionata
    useEffect(() => {
        if(selectDate != '') {
            setForm({ 
                ...form, 
                date: format(selectDate, 'yyyy-MM-dd'),
                time: '',
            });
            setSelectTime('');
        }
    }, [selectDate]);

    //Filtro i giorni di chiusura
    const isCloseDay = (date) => {
        const day = getDay(date);
        return day !== restaurantOption.closeDays;
    };

    const CustomInput = forwardRef(({ onClick, value }, ref) => (
        <div className="input-container mb-20">
            <BsCalendarDateFill size={20} color={'var(--black)'} />
            <input className='w-100 p-10 input-primary' defaultValue={value} onClick={onClick} ref={ref} placeholder='Seleziona una data' />
            { error && <Validation errorText="Seleziona la data" /> }
        </div>
    ));

    return (
        <DatePicker
            selected={selectDate}
            onChange={(date) => {
                setSelectDate(date);
            }}
            filterDate={isCloseDay}
            timeIntervals={30}
            minDate={new Date()}
            maxDate={addMonths(new Date(), 6)}
            dateFormat='dd/MM/yyyy'
            customInput={<CustomInput />}
        />    
    );
}
