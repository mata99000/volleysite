import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputImage from '@/Components/InputImage';

export default function UploadImage({props, className = ""}) {
    const user = usePage().props.auth.user;

    const { data, setData, post  } = useForm({
        image: user.image_name,
    });

    function handleSubmitImage(e) {
        e.preventDefault();

        post(route('profile.set_profile_image'));
    }

console.log(user.image_name);
    return (
        <section className={className}>
        <header>
            <h2 className="text-lg font-medium text-gray-900">Upload Image</h2>

            <p className="mt-1 text-sm text-gray-600">
                Upload your image here.
            </p>
        </header>

        <form onSubmit={handleSubmitImage} className="mt-6 space-y-6">

                <div>
                    <img className="h-20 border rounded" src={`avatars/${user.image_name}`} />
                    <InputLabel htmlFor="image" value="image" name="image"/>
                    <InputImage 
                        onChange={e => setData('image', e.target.files[0])} 
                    />
                </div>
                <div className="mt-4">
                        <button type="submit" className="px-6 py-2 font-bold text-white bg-green-500 rounded">Save</button>
                </div>

        </form>

        </section>
    );

}