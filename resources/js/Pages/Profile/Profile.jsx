import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProfileTabs from '@/Pages/Profile/ProfilePartials/ProfileTabs';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Profile({ auth }) {
    const { users_profile } = usePage().props;

    // Funkcija za formatiranje datuma rođenja i računanje starosti
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        // Izračunavanje starosti korisnika
        const today = new Date();
        let age = today.getFullYear() - year;
        const m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < day)) {
            age--;
        }

        return `${day} ${month} ${year} (${age} years old)`;
    };

    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title={`${users_profile.name} ${users_profile.lastname} - Profile`} />

            <div className="mx-auto container">
                <div className="relative group">
                    <img src="https://img.freepik.com/free-photo/high-angle-composition-with-volleyballs_23-2149023837.jpg?t=st=1723222142~exp=1723225742~hmac=923b49631a618fe56394d502f79b21ad672b5323fef3e1160c068bbc6f98a3f9&w=1380"
                     className="w-full h-[350px] object-cover"></img>
                     <button className="absolute top-2 right-2 bg-gray-50 hover:bg-gray-100 text-gray-800 py-1 px-2 text-xs flex items-center opacity-0 group-hover:opacity-100">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>

                        Update Cover Image
                        <input type="file" accept="image/*" className="absolute left-0 top-0 bottom-0 right-0 opacity-0 cursor-pointer"></input>
                     </button>
                    <div className="flex">
                            <img src={`/storage/avatars/${users_profile.image_name}`}
                            className="rounded-full w-[100px] h-[100px] ml-[100px] -mt-[120px]"></img>
                        <div className="flex justify-between items-center flex-1 p-4 capitalize ml-[10px] -mt-[144px]">
                            <h1 className="text-6xl font-bold text-white">{`${users_profile.name} ${users_profile.lastname}`}</h1>

                        </div>
                    </div>
                </div>   
                    <div className="w-full px-2 sm:px-0 border-t">
                            <ProfileTabs />
                    </div>
                    
                
               
                
                
                {/* <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 bg-white shadow-sm rounded-lg p-6 space-y-6">
                 
                    {users_profile && (
                        <div className="text-center">
                            {users_profile.image_name && (
                                <div className="mb-6">
                                    <img
                                        src={`/storage/avatars/${users_profile.image_name}`}
                                        alt={`${users_profile.name} ${users_profile.lastname}`}
                                        className="w-32 h-32 rounded-full mx-auto"
                                    />
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl font-bold">{users_profile.name} {users_profile.lastname}</h1>
                                <p className="text-gray-600">{users_profile.nickname}</p>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold">Email</h2>
                                    <p className="text-gray-800">{users_profile.email}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">City</h2>
                                    <p className="text-gray-800">{users_profile.city}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">Motto</h2>
                                    <p className="text-gray-800">{users_profile.motto}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">About</h2>
                                    <p className="text-gray-800">{users_profile.about}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">Gender</h2>
                                    <p className="text-gray-800 capitalize">{users_profile.gender}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">Date of Birth</h2>
                                    <p className="text-gray-800">{formatDate(users_profile.dob)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div> */}
            </div>
        </AuthenticatedLayout>
    );
}
