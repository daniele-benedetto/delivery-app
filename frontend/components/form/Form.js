import CheckboxGroup from './checkbox/CheckboxGroup';
import Input from './input/Input';
import Button from './button/Button';

import { newsletter, privacy } from '../../pages/api/local';

export default function Form({
    form, 
    setForm,
}) {
    return (
        <form className="row g-3">
            <div className="col-12">

                <Input 
                    id='name'
                    label='Name'
                    type='text'
                    value={form.name}
                    onChange={(event) => {
                        const val = event.target.value;
                        setForm({ ...form, name: val });
                    }}
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
                />

                <CheckboxGroup 
                    values={newsletter}
                    onChange={(selected) => {
                        setForm({ ...form, newsletter: selected });
                    }}
                />

                <CheckboxGroup 
                    values={privacy}
                    onChange={(selected) => {
                        setForm({ ...form, privacy: selected });
                    }}
                />

                <Button
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                    text='Prenota'
                />

            </div>
        </form>
    );
}
