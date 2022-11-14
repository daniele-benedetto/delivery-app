export default function Checkbox({ 
    id, 
    value, 
    description, 
    onChange,
}) {
    return (
        <div className="form-check">
            <label className="form-check-label" htmlFor={id}>
                {description}
            </label>
            <input
                id={id}
                name={id}
                type="checkbox"
                value={value}
                onChange={onChange}
                className="form-check-input"
            />
        </div>
    );
};
  