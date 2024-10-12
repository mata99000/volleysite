import React, { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import InputImage from '@/Components/InputImage';

const EditClubForm = ({ data }) => {
    const [previewUrl, setPreviewUrl] = useState(data.club_pic ? `/storage/club_pics/${data.club_pic}` : null);
    const [isImageChanged, setIsImageChanged] = useState(false); // Novo stanje za praćenje da li je slika promenjena

    const { data: formData, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: data?.name || '', 
        country: data?.country || '',
        city: data?.city || '',
        socials: data?.socials || '',
        roster: data?.roster || '',
        // Ovaj deo uklanjamo jer ne treba slati club_pic ako slika nije promenjena
    });

    // Funkcija za slanje forme
    const submit = (e) => {
        e.preventDefault();

        const submitData = {
            name: formData.name,
            country: formData.country,
            city: formData.city,
            socials: formData.socials,
            roster: formData.roster,
        };

        // Samo ako je slika promenjena, dodajemo je u podatke za slanje
        if (isImageChanged) {
            submitData.club_pic = formData.club_pic;
        }

        post(route('club.update', { club: data.id }), {
            data: submitData,
            preserveScroll: true,
            forceFormData: true, // Ovo je bitno za upload slika i fajlova
        });
    };

    // Funkcija za prikaz preview slike i postavljanje slike
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setData('club_pic', file); // Ažuriramo club_pic u formData
            setIsImageChanged(true); // Postavljamo da je slika promenjena
        } else {
            setIsImageChanged(false); // Ako nema slike, postavljamo da nije promenjena
        }
    };

    return (
      <section>
        <header>
            <h2 className="text-lg font-medium text-gray-900">Change Club Information</h2>
            <p className="mt-1 text-sm text-gray-600">
                Edit your club information.
            </p>
        </header>

        <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
            <div>
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={formData.name}
                    onChange={(e) => setData('name', e.target.value)}
                    autoComplete="name"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div>
                <InputLabel htmlFor="country" value="Country" />
                <TextInput
                    id="country"
                    className="mt-1 block w-full"
                    value={formData.country}
                    onChange={(e) => setData('country', e.target.value)}
                    autoComplete="country"
                />
                {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
            </div>

            <div>
                <InputLabel htmlFor="city" value="City" />
                <TextInput
                    id="city"
                    className="mt-1 block w-full"
                    value={formData.city}
                    onChange={(e) => setData('city', e.target.value)}
                    autoComplete="city"
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
            </div>

            <div>
                <InputLabel htmlFor="socials" value="Socials" />
                <TextInput
                    id="socials"
                    className="mt-1 block w-full"
                    value={formData.socials}
                    onChange={(e) => setData('socials', e.target.value)}
                    autoComplete="socials"
                />
                {errors.socials && <span className="text-red-500 text-sm">{errors.socials}</span>}
            </div>

            <div>
                <InputLabel htmlFor="roster" value="Roster" />
                <TextInput
                    id="roster"
                    className="mt-1 block w-full"
                    value={formData.roster}
                    onChange={(e) => setData('roster', e.target.value)}
                    autoComplete="roster"
                />
                {errors.roster && <span className="text-red-500 text-sm">{errors.roster}</span>}
            </div>

            {/* Prikaz slike */}
            {previewUrl && (
                <img className="h-20 border rounded" src={previewUrl} alt="Club Pic Preview" />
            )}

            <div className="mt-6 space-y-6">
                <InputLabel htmlFor="club_pic" value="Club Picture" />
                <InputImage
                    id="club_pic"
                    onChange={handleImageChange}
                />
                {errors.club_pic && <span className="text-red-500 text-sm">{errors.club_pic}</span>}
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
};

export default EditClubForm;
