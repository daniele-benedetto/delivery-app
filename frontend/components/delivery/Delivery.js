import { GrCircleAlert } from "react-icons/gr";

export default function Delivery() {

    return(
        <>
            <small className="w-100 text-left mt-20 row-between-center px-20">
                <span>
                    < GrCircleAlert size={15} className='me-2 mb-1' />
                    Consegna a domicilio prevista alle --:--
                </span>
                <span className="color-primary">Cambia</span>
            </small>
        </>
    );
}