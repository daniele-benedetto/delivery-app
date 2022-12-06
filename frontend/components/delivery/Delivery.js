import { useEffect, useState } from "react";
import { GrCircleAlert, GrFormClose } from "react-icons/gr";
import { useStateContext } from "../../utils/Context";
import Location from "../location/Location";

export default function Delivery({delivery, setDelivery, setLoader}) {

    const {
        address,
        date,
        time
    } = useStateContext();

    const [menu, setMenu] = useState(false);
    const [addressMenu, setAddressMenu] = useState(false);
    const [dateMenu, setDateMenu] = useState(false);

    const changeDelivery = (value) => {
        setDelivery(value);
    }

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
                    date
                </div> }

            </div> }
        </>
    );
}