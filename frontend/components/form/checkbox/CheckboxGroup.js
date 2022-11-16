import { useEffect, useState } from "react";
import { Validation } from "../validation/Validation";
import Checkbox from "./Checkbox";

export default function CheckboxGroup({ 
    values, 
    onChange, 
    error
}) {

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        onChange(selected);
    }, [selected]);

    const handleChange = (event) => {
        
        const target = event.target;
        const val = target.value;
        const checked = target.checked;
        const parseVal = parseInt(val, 0);

        if (!checked) {
                setSelected([...selected.filter((i) => i !== parseVal)]);
            } else {
                setSelected([...selected, parseVal]);
            }

    };

    return (

        <div className={`col-12`}>
            {values.map((checkbox, idx) => {
                return (
                    <Checkbox
                        key={idx}
                        id={checkbox.id}
                        description={checkbox.description}
                        value={checkbox.value}
                        onChange={handleChange}
                        error={error}
                    />
                );
            })}
            { error && <Validation errorText='Devi accettare i termini' /> }
        </div>
        
    );
};
