import React from 'react';
import { Link } from '@inertiajs/react';

const AllClubs = ({ clubs }) => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">All Clubs</h1>
            
            {/* Grid layout for clubs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club) => (
                    <div key={club.id} className="p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{club.name}</h2>
                        <p className="text-sm text-gray-700">Country: {club.country}</p>
                        <p className="text-sm text-gray-700">City: {club.city}</p>
                        <p className="text-sm text-gray-700">Socials: {club.socials}</p>

                        {club.club_pic && (
                            <img
                                className="h-32 w-32 mt-4 object-cover rounded-lg shadow-sm"
                                src={`/storage/club_pics/${club.club_pic}`}
                                alt="Club Pic"
                            />
                        )}

                        {/* Buttons for viewing and editing */}
                        <div className="mt-4 space-x-2">
                            <Link
                                href={route('club.show', club.name)}
                                className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            >
                                View Club
                            </Link>
                            <Link
                                href={route('club.edit', club.name)}
                                className="inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
                            >
                                Edit Club
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllClubs;
