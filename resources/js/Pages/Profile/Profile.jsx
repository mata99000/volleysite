import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProfileTabs from '@/Pages/Profile/ProfilePartials/ProfileTabs';

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

            <div className="py-12 mx-auto container">
                <div className="relative">
                    <img src="https://img.freepik.com/free-photo/high-angle-composition-with-volleyballs_23-2149023837.jpg?t=st=1723222142~exp=1723225742~hmac=923b49631a618fe56394d502f79b21ad672b5323fef3e1160c068bbc6f98a3f9&w=1380"
                     className="w-full h-[200px] object-cover"></img>
                    <img src={`/storage/avatars/${users_profile.image_name}`}
                        className="absolute rounded-full left-[100px] w-[128px] h-[128px] -bottom-[48px]"></img>
                </div>
                <div className="w-full px-2 sm:px-0">
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
