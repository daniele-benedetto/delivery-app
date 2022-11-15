export default function Select({ 
  id, 
  label, 
  values, 
  onChange,
  error
}) {
    return (
        <div className={"col-12"}>
        <label htmlFor={id} className={`form-label`}>{label}</label>
            <select
                id={id}
                name={id}
                onChange={onChange}
                className={`form-select`}
            >
                <option></option>
                {values.map((val, idx) => {
                    return (
                        <option key={idx} value={val.id}>
                            {val.time}
                        </option>
                    );
                })}
            </select>
            { error && <small className={`text-danger`}>Scegli un'opzione</small> }
        </div>
    );
}
    
