import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import axios from 'axios';

export default function UploadImage({ className = "" }) {
    const { auth: { user } } = usePage().props;
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imageName, setImageName] = useState(user.image_name);
    const [imageSelected, setImageSelected] = useState(false);
    const [errors, setErrors] = useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageSelected(!!file);

        // Prikaži pregled slike
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmitImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', e.target.image.files[0]);

        try {
            const response = await axios.post(route('profile.set_profile_image'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                }
            });

            if (response.status === 200) {
                setProgress(0); // Resetujte progres bar
                setPreview(response.data.image_url); // Ažurirajte pregled slike
                setImageName(response.data.image_name); // Ažurirajte ime slike
                setImageSelected(false); // Resetujte stanje dugmeta
                setErrors({}); // Očistite greške
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error uploading image:', error);
            }
        }
    };

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
                    {preview ? (
                        <img className="h-20 border rounded" src={preview} alt="Profile Preview" />
                    ) : (
                        imageName && (
                            <img className="h-20 border rounded" src={`/storage/avatars/${imageName}`} alt="Profile" />
                        )
                    )}
                    <InputLabel htmlFor="image" value="Image" />
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.image && <p className="text-red-600">{errors.image[0]}</p>}
                </div>
                {progress > 0 && (
                    <div className="w-full bg-gray-200 h-1.5 mt-4">
                        <div
                            className="bg-green-500 h-1.5"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}
                <div className="mt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                        disabled={!imageSelected} // Omogućite dugme samo ako je slika odabrana
                    >
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
}
