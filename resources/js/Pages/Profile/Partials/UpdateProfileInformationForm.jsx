import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputRadio from '@/Components/InputRadio';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ props, mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;


    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        lastname: user.lastname,
        city: user.city,
        gender: user.gender,
        contact: user.contact,
        dob: user.dob = localStorage.getItem('dob'),
    });

    const onKeyPressEvent = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (!new RegExp("[0-9]").test(keyValue)) event.preventDefault();
        return;
      };
    
    const submit = (e) => {
        e.preventDefault();

        patch(route('personal.update_profile'));
    };

    const handleChange = (e) => {
        setData('dob', e.target.value);
        localStorage.setItem("dob", e.target.value);
      }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Personal Settings</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your personal settings information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="lastname" value="Lastname" />

                    <TextInput
                        id="lastname"
                        className="mt-1 block w-full"
                        value={data.lastname}
                        onChange={(e) => setData('lastname', e.target.value)}
                        autoComplete="lastname"
                    />

                    <InputError className="mt-2" message={errors.lastname} />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="City" />

                    <TextInput
                        id="city"
                        className="mt-1 mb-6 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        required
                        autoComplete="city"
                    />

                    <InputError className="mt-2" message={errors.city} />
                </div>

                <div className="inline">
                <   InputLabel htmlFor="gender" value="Gender"/>
                    <InputLabel htmlFor="gender" value="Male" className="inline mr-1" />
                    <InputRadio
                        className="mt-2 mr-2"
                        name="gender"
                        value="male"
                        onChange={(e) => setData('gender', e.target.value)}
                        checked={data.gender === "male"}
                    />
                </div>

                <div className="inline mx-3">
                <InputLabel htmlFor="gender" value="Female" className="inline mx-1"/>
                    <InputRadio
                        className="mt-2"
                        name="gender"
                        value="female"
                        onChange={(e) => setData('gender', e.target.value)}
                        checked={data.gender === "female"}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="dob" value="DateOfBirth" />

                    <TextInput 
                        id="dob"
                        name="dob"
                        type="date"
                        value={data.dob}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="contact" value="Contact" />

                    <TextInput
                        id="contact"
                        inputmode="numeric"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        placeholder="0621234567"
                        className="mt-1 block w-full"
                        value={data.contact}
                        onChange={(e) => setData('contact', e.target.value)}
                        autoComplete="contact"
                        onKeyPress={onKeyPressEvent}
/>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
