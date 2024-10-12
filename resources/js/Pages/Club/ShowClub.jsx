import React from 'react';
import { Link } from '@inertiajs/react';

const ShowClub = ({ club, auth }) => {
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{club.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p className="text-lg text-gray-700 mb-2">Country: <span className="font-semibold">{club.country}</span></p>
                    <p className="text-lg text-gray-700 mb-2">City: <span className="font-semibold">{club.city}</span></p>
                    <p className="text-lg text-gray-700 mb-2">Socials: <span className="font-semibold">{club.socials}</span></p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                    {club.club_pic && (
                        <img className="h-40 w-40 object-cover rounded-lg shadow-lg" src={`/storage/club_pics/${club.club_pic}`} alt="Club Pic" />
                    )}
                    {club.roster && (
                        <img className="h-40 w-40 object-cover rounded-lg shadow-lg" src={`/storage/roster_pics/${club.roster}`} alt="Roster Pic" />
                    )}
                </div>
            </div>

            {auth && auth.id === club.user_id && (
                <div className="mt-6">
                    <Link
                        href={route('club.edit', club.name)}
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
                    >
                        Edit Club
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ShowClub;
