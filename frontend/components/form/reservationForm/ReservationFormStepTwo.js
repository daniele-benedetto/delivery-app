import Button from '../button/Button';
import CheckboxGroup from '../checkbox/CheckboxGroup';
import Input from '../input/Input';
import Select from '../select/Select';

export default function ReservationFormStepTwo({
    form,
    setForm,
    formError,
    newsletterData,
    privacyData,
    setFormError,
    setAvailable,
    placesNumber,
    setMessage
}) { 

    let values = form;

    console.log(form)

    let placesSelect = new Object();
    let placesArray = [];

    //Verifico che i campi non siano vuoti, se lo sono verranno dichiarati su true
    const handleFormError = (e) => {

        e.preventDefault();

        setFormError({
            ...formError,
            date: form.date === "",
            time: form.time === "",
            meal: form.meal === "",
            place: form.place === "",
            name: form.name === "",
            surname: form.surname === "",
            email: form.email === "",
            phone: form.phone === "",
            reservation: form.reservation === "",
            privacy: form.privacy.length === 0,
        });

    }

    const reset = (e) => {

        e.preventDefault();

        setForm({
            ...form,
            date: "",
            time: "",
            meal: "", //0 => pranzo, 1 => cena
            place: "", //0 => interno, 1 => esterno
            name: "",
            surname: "",
            email: "",
            phone: "",
            reservation: "",
            newsletter: [],
            privacy: [],
        });

        setAvailable(false);
        setMessage('');
        
    }

    const handleSubmit = async values => {

        const request = await fetch('/api/reservation/reservation', {
            method: "POST",
            body: JSON.stringify(values)
        });

        const result = await request.json();

        if(result.data != 'ok') {
            console.log('errore')
            return;
        }

        console.log('yeeee')
    }

    const generatePlacesNumberSelect = () => {

        let index = 0;
        let i = 0;
        let number = [];

        //Genero un array contentente il singoli posti disponili
        while (index<placesNumber){
            index++
            number.push(index);
        }
        
        //Ciclo i singoli posti per generare un array di oggetti
        //L'array di oggetti sarà la variabile che passerò al select
        //per generare le singole opzioni
        for (i=1; i<=number.length; i++){
            placesSelect = new Object();
            placesSelect['id'] = i;
            placesSelect['time'] = i;
            placesArray.push(placesSelect);
        }

    }

    generatePlacesNumberSelect();

    return(
        
        <form>

            <Button
                onClick={reset}
                text='Reset'
            />  

            <Input
                id='name'
                label='Name'
                type='text'
                value={form.name}
                onChange={(event) => {
                    const val = event.target.value;
                    setForm({ ...form, name: val });
                }}
                error={formError.name}
            />
        
            <Input 
                id='surname'
                label='Surname'
                type='text'
                value={form.surname}
                onChange={(event) => {
                    const val = event.target.value;
                    setForm({ ...form, surname: val });
                }}
                error={formError.surname}
            />
        
            <Input 
                id='email'
                label='Email'
                type='text'
                value={form.email}
                onChange={(event) => {
                    const val = event.target.value;
                    setForm({ ...form, email: val });
                }}
                error={formError.email}
            />
                
            <Input 
                id='phone'
                label='Phone'
                type='tel'
                value={form.phone}
                onChange={(event) => {
                    const val = event.target.value;
                    setForm({ ...form, phone: val });
                }}
                error={formError.phone}
            />

            <Select
                id='reservation'
                label='Per quante persone vuoi prenotare?'
                values={placesArray}
                onChange={(event) => {
                    const val = event.target.value;
                    setForm({ ...form, reservation: val });
                }}
                error={formError.reservation}
            />
                
            <CheckboxGroup
                values={newsletterData}
                onChange={(selected) => {
                    setForm({ ...form, newsletter: selected });
                }}
                error={formError.newsletter}
            />
                
            <CheckboxGroup 
                values={privacyData}
                onChange={(selected) => {
                    setForm({ ...form, privacy: selected });
                }}
                error={formError.privacy}
            />
                
            <Button
                onClick={handleSubmit(values)}
                text='Prenota'
            />
            
        </form>
    );
}