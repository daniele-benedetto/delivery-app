import { forwardRef, useState } from "react";
import { GrCircleAlert, GrFormClose } from "react-icons/gr";
import { daySelect, restaurantOption } from "../../pages/api/local";
import { useStateContext } from "../../utils/Context";

import Select from "../form/select/Select";
import Location from "../location/Location";

import DatePicker from 'react-datepicker';
import {  setHours, setMinutes, format, addMinutes, addDays } from 'date-fns';

export default function Delivery({delivery, setDelivery, setLoader}) {

    const {
        address,
        date,
        time,
        setDate,
        setTime,
    } = useStateContext();

    const [menu, setMenu] = useState(false);
    const [addressMenu, setAddressMenu] = useState(false);
    const [dateMenu, setDateMenu] = useState(false);
    const [data, setData] = useState('')

    const today = format(new Date(), "yyyy-MM-dd");

    let slots = [];

    let startLunch  = new Date([today, restaurantOption.openTime.lunch.start]);
    let finishLunch  = new Date([today, restaurantOption.openTime.lunch.finish]);

    let startDinner  = new Date([today, restaurantOption.openTime.dinner.start]);
    let finishDinner  = new Date([today, restaurantOption.openTime.dinner.finish]);

    const changeDelivery = (value) => {
        setDelivery(value);
    }

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
                
            if( time < now && date == format(now, 'yyyy-MM-dd')) {
                timetables.shift();
            }
                
        }

        return timetables;

    }

    const CustomInput = forwardRef(({ onClick, value }, ref) => (
        <div className="input-container mb-20">
            <input className='w-100 p-10 input-primary' defaultValue={value} onClick={onClick} ref={ref} placeholder='Seleziona un orario'/>
        </div>
    ));

    return(
        <>
            <small className="w-100 text-left mt-20 row-between-center px-20">
                <span>
                    < GrCircleAlert size={15} className='me-2 mb-1' />
                    {delivery == 1 && `Consegna a domicilio prevista alle ${date && '-' && time}`}
                    {delivery == 0 && `Ritiro presso il ristorante alle ${date && '-' && time}`}
                </span>
                <button className="button-link" onClick={() => setMenu(!menu)}>Cambia</button>
            </small>

            { menu && <div className="menu-delivery w-100 p-20">

                <GrFormClose
                    size={30}
                    color={'var(--black)'}
                    onClick={() => setMenu(!menu)}
                />
                <div className="m-auto row-between-center w-100 mw-250">
                    <button className={`${delivery == 1 ? 'button-active' : 'button-not-active'}`} onClick={()=> changeDelivery(1)}>Consegna</button>
                    <button className={`${delivery == 0 ? 'button-active' : 'button-not-active'}`} onClick={() => changeDelivery(0)}>Ritiro</button>
                </div>

                <div className="mt-40 row-between-center w-100 text-left font-min">
                    <div className="">{address}</div>
                    <button onClick={() => setAddressMenu(!addressMenu)} className="button-link">Cambia</button>
                </div>
                <div className="mt-40 row-between-center w-100 text-left font-min">
                    <span>{date} - {time}</span>
                    <button onClick={() => setDateMenu(!dateMenu)} className="button-link">Cambia</button>
                </div>

            </div> }

            { addressMenu && <div className="menu-delivery w-100 p-20">

                <GrFormClose
                    size={30}
                    color={'var(--black)'}
                    onClick={() => setAddressMenu(!addressMenu)}
                />

                <Location setLoader={setLoader} setAddressMenu={setAddressMenu} />

            </div> }

            { dateMenu && <div className="menu-delivery w-100 p-20">

                <GrFormClose
                    size={30}
                    color={'var(--black)'}
                    onClick={() => setDateMenu(!dateMenu)}
                />

                <Select
                    id='day'
                    className='mt-40'
                    values={daySelect}
                    onChange={(event) => {
                        const today = format(new Date(), "yyyy-MM-dd");
                        const val = event.target.value;
                        val == 0 
                        ? setDate(today) 
                        : setDate( format(addDays(new Date(today), 1) ,'yyyy-MM-dd'));
                    }}
                />    

                <DatePicker
                    selected={data}
                    onChange={(date) => {
                        setTime(format(date, 'H:mm'))
                        setData(date)
                    }}
                    includeTimes={generateTimetables()}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="H:mm"
                    customInput={<CustomInput />}
                />

            </div> }
        </>
    );
}