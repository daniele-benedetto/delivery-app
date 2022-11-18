import Button from '../button/Button';
import CheckboxGroup from '../checkbox/CheckboxGroup';
import Input from '../input/Input';

export default function ReservationFormStepTwo({
    form,
    setForm,
    formError,
    newsletterData,
    privacyData,
    setFormError,
    setAvailable
}) { 

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
            newsletter: !form.newsletter.length === 0,
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
            newsletter: [],
            privacy: [],
        });

        setAvailable(false);
        
    }

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
                onClick={handleFormError}
                text='Prenota'
            />
            
        </form>
    );
}