export default function Button({ 
  text,
  onClick,
}) {
    return (
        <div className="col-12 mt-3">
            <button
                className="btn btn-primary"  
                onClick={onClick}
                type='submit'
            >
                {text}
            </button>
        </div>
    );
}