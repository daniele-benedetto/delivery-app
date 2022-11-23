export function Validation({errorText}) {

    return(
        <small className={`text-danger`}>{errorText}</small>
    );
}