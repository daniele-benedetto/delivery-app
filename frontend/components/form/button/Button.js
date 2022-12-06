export default function Button({ text, onClick }) {
    return (
        <button 
            className='button-primary'
            onClick={onClick}
            type='submit'
        >
            {text}
        </button>
    );
}