import { Validation } from "../validation/Validation";

export default function Select({ 
  id, 
  values, 
  onChange,
  error,
  Icon,
  className
}) {

    return (
        <div className={`${className} select-container mb-20 w-100`}>
            <Icon
                size={20}
                color={'var(--black)'}
            />
            <select
                id={id}
                name={id}
                onChange={onChange}
                className='select-primary w-100 p-10'
            >
                {values.map((val, idx) => {
                    return (
                        <option key={idx} value={val.id}>
                            {val.time}
                        </option>
                    );
                })}
            </select>
            { error && <Validation errorText="Seleziona un'opzione" /> }
        </div>
    );
}
    
