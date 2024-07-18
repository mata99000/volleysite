import React, {useEffect} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import UploadImageTournament from './UploadImageTournament';
import InputImage from '@/Components/InputImage';
let previewUrl;


export default function AddTournamentForm({ props, status, className = '' }) {
    const tournaments = usePage().props.auth.tournaments;

    const { data, setData, setTournament, post, patch, errors, processing, recentlySuccessful } = useForm({
        //name: tournaments.name,
        //date: tournaments.date = localStorage.getItem('date'),
        //location: tournaments.location,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('add.tournament'));
        useEffect(() => {
            return () => {
              previewUrl && URL.revokeObjectURL(previewUrl); 
            }
          }, []);

    };
    const handleChangeStart = (e) => {
        setData('start_date', e.target.value);
        localStorage.setItem("start_date", e.target.value);
      }

    const handleChangeEnd = (e) => {
        setData('end_date', e.target.value);
        localStorage.setItem("end_date", e.target.value);
    }

    return (
        <section>
            <form onSubmit={ submit} className="mt-6 space-y-6">
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
                    <InputLabel htmlFor="start_date" value="Start date" />

                    <TextInput 
                        id="start_date"
                        name="start_date"
                        type="date"
                        value={data.date}
                        onChange={handleChangeStart}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="end_date" value="End date" />

                    <TextInput 
                        id="end_date"
                        name="end_date"
                        type="date"
                        value={data.date}
                        onChange={handleChangeEnd}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="location" value="Location" />

                    <TextInput
                        id="location"
                        className="mt-1 mb-6 block w-full"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        required
                        autoComplete="location"
                    />

                    <InputError className="mt-2" message={errors.city} />
                </div>

                <div className="mt-6 space-y-6">
                    <ul className="flex flex-wrap">
                    {previewUrl && (
                    <img src={previewUrl} alt="Preview" />
                    )}
                    <InputImage
                    onChange={(e) => {
                    previewUrl = URL.createObjectURL(e.target.files[0]); 
                    setData('tournament_pic', e.target.files[0]);
                     }}
                     />
                    </ul>
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