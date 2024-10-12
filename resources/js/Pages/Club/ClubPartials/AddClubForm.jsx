import React, {useEffect} from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import InputImage from '@/Components/InputImage';
let previewUrl;

export default function AddClubForm({className = '', props}) {
    const club = usePage().props.auth.club;

    const { data , usedata, setData, post, processing, recentlySuccessful } = useForm({
      
         
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('club.store'));
    };
    useEffect(() => {
        return () => {
          previewUrl && URL.revokeObjectURL(previewUrl); 
        }
      }, []);
    
      
    
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Club Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Enter your club information.
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
                        autoComplete="name"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="country" value="Country" />

                    <TextInput
                        id="country"
                        className="mt-1 block w-full"
                        value={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                        autoComplete="country"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="City" />

                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        autoComplete="city"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="Socials" value="Socials" />

                    <TextInput
                        id="socials"
                        className="mt-1 block w-full"
                        value={data.socials}
                        onChange={(e) => setData('socials', e.target.value)}
                        autoComplete="socials"
                    />
                </div>



                <div>
                    <InputLabel htmlFor="roaster" value="Roaster" />

                    <TextInput
                        id="roaster"
                        className="mt-1 block w-full"
                        value={data.roaster}
                        onChange={(e) => setData('roaster', e.target.value)}
                        autoComplete="roaster"
                    />
                </div>

                
                <div className="mt-6 space-y-6">
                    <ul className="flex flex-wrap">

                        <InputLabel htmlFor="image" value="" name="image"/>
                      
<InputImage
  onChange={(e) => {
    previewUrl = URL.createObjectURL(e.target.files[0]); 
    setData('club_pic', e.target.files[0]);
  }}
/>

{previewUrl && (
  <img src={previewUrl} alt="Preview" />
)}
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