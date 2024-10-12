import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProfileTabs from '@/Pages/Profile/ProfilePartials/ProfileTabs';
import axios from 'axios';

export default function Profile({ auth }) {
    const { users_profile } = usePage().props;
    const [coverPreview, setCoverPreview] = useState(null);
    const [userCoverImage, setUserCoverImage] = useState(users_profile.cover_image);
    const [selectedCoverImage, setSelectedCoverImage] = useState(false);
    const [errors, setErrors] = useState({});

    // prikaz slike koju zelis uploadovati
    const onCoverChange = (e) => {
   
        const file = e.target.files[0];
        setSelectedCoverImage(true);

        const reader = new FileReader();
            reader.onloadend = () => {
            setCoverPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setCoverPreview(null);
        }
    };
    // Snimanje slike (refresh potreban)
    const handleSubmitCover = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('cover_image', e.target.cover_image.files[0]);

        try {
            const response = await axios.post(route('profile.set_cover_image'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setCoverPreview(response.data.cover_image_url);
                setUserCoverImage(response.data.cover_image_name);
                setSelectedCoverImage(false);
                setErrors({});
                alert("Slika je uspesno promenjena.");
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error uploading cover image:', error);
                alert("Došlo je do greške prilikom uploada slike. Molimo pokušajte ponovo.");
            }
        }

        useEffect(() => {
            handleSubmitCover();
        },[])
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title={`${users_profile.name} ${users_profile.lastname} - Profile`} />

            <div className="mx-auto container">
                <form onSubmit={handleSubmitCover}>
                <div className="relative group">
                    {coverPreview ? (
                    <img 
                    id="cover_image" 
                    src={coverPreview}
                    className="w-full h-[350px] object-cover">
                    </img>
                    ) : (
                        userCoverImage && (
                            <img 
                        id="cover_image" 
                        src={`/storage/covers/${userCoverImage}`}
                        className="w-full h-[350px] object-cover">
                     </img>
                        )
                        
                    )} 

                     <button className="absolute top-2 right-2 bg-gray-50 hover:bg-gray-100 text-gray-800 py-1 px-2 text-xs flex items-center opacity-0 group-hover:opacity-100">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>

                        Update Cover Image
                        <input 
                            onChange={onCoverChange} 
                            type="file" 
                            accept="image/*" 
                            id="cover_image" 
                            name="cover_image" 
                            className="absolute left-0 top-0 bottom-0 right-0 opacity-0 cursor-pointer">    
                        </input>
                     </button>

                     {errors.cover_image && <p className="text-red-600 absolute bottom-2 left-2 z-30">{errors.cover_image[0]}</p>}

                    <div className="flex">
                            <img src={users_profile.image_name ? `/storage/avatars/${users_profile.image_name}` : `/storage/avatars/default.jpg`}
                            className="rounded-full w-[100px] h-[100px] ml-[100px] -mt-[120px]"></img>
                        <div className="flex justify-between items-center flex-1 p-4 capitalize ml-[10px] -mt-[144px]">
                            <h1 className="text-6xl font-bold text-white">{`${users_profile.name} ${users_profile.lastname}`}</h1>
                        </div>
                    </div> 
                    
                { selectedCoverImage && (
                        <button 
                            type="submit"
                            className="absolute top-2 right-2 bg-gray-50 hover:bg-gray-100 text-gray-800 py-1 px-2 text-xs flex items-center opacity-0 group-hover:opacity-100">
                           Save
                        </button>
                     )} 
                     </div>
                </form>

                    <div className="w-full px-2 sm:px-0 border-t">
                            <ProfileTabs />
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}
