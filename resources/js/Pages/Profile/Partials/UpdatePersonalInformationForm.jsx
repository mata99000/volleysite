import React from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePersonalInformationForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, processing, recentlySuccessful } = useForm({
        nickname: user.nickname,
        fav_num: user.fav_num,
        idol: user.idol,
        motto: user.motto,
        about: user.about,
    });

    const onKeyPressEvent = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (!new RegExp("[0-9]").test(keyValue)) event.preventDefault();
        return;
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('personal.settings_information'), {
            preserveScroll: true, // Ovo osigurava da se stranica ne skroluje na vrh
            onSuccess: () => {
                // Dodatna logika nakon uspešnog ažuriranja, ako je potrebna
            }
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your personal information
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="nickname" value="Nickname" />
                    <TextInput
                        id="nickname"
                        className="mt-1 block w-full"
                        value={data.nickname}
                        onChange={(e) => setData('nickname', e.target.value)}
                        autoComplete="nickname"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="fav_num" value="Favorite Number" />
                    <TextInput
                        id="fav_num"
                        className="mt-1 block w-full"
                        value={data.fav_num}
                        onChange={(e) => setData('fav_num', e.target.value)}
                        autoComplete="fav_num"
                        onKeyPress={onKeyPressEvent}
                        maxLength='2'
                    />
                </div>

                <div>
                    <InputLabel htmlFor="idol" value="Idol" />
                    <TextInput
                        id="idol"
                        className="mt-1 block w-full"
                        value={data.idol}
                        onChange={(e) => setData('idol', e.target.value)}
                        autoComplete="idol"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="motto" value="Motto" />
                    <TextInput
                        id="motto"
                        className="mt-1 block w-full"
                        value={data.motto}
                        onChange={(e) => setData('motto', e.target.value)}
                        autoComplete="motto"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="about" value="About Me" />
                    <TextInput
                        id="about"
                        className="mt-1 block w-full"
                        value={data.about}
                        onChange={(e) => setData('about', e.target.value)}
                        autoComplete="about"
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
    )
}
