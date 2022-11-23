export default function Checkbox({ 
    id, 
    value, 
    description, 
    onChange
}) {
    return (
        <div className={`form-check mt-3`}>
            <label className={`form-check-label col-12`} htmlFor={id}>
                {description}
            </label>
            <input
                id={id}
                name={id}
                type="checkbox"
                value={value}
                onChange={onChange}
                className={`form-check-input`}
            />
        </div>
    );
};
  