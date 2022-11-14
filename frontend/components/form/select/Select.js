export default function Select({ 
  id, 
  label, 
  values, 
  onChange
}) {
    return (
        <div className="col-12">
        <label htmlFor={id} className="form-label">{label}</label>
            <select
                id={id}
                name={id}
                onChange={onChange}
                className="form-select"
            >
                {values.map((val, idx) => {
                    return (
                        <option key={idx} value={val.id}>
                            {val.time}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
    
