export default function Input({ 
    id, 
    label, 
    type,
    value, 
    onChange,
    error
}) {

    return (
        <div className={`col-12 mt-3`}>
            <label htmlFor={id} className={`block text-sm font-medium text-gray-700`}>{label}</label>
            <input
                name={id} 
                id={id}
                className={`form-control`}
                type={type} 
                value={value} 
                onChange={onChange}
                required
            />
            { error && <small className={`text-danger`}>il campo {label} è obbligatorio</small> }
        </div>
    );
}



