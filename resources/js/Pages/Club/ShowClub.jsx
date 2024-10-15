import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';

const ShowClub = ({ club, auth, userIsMember, membershipStatus, clubMembers }) => {
    const { data, setData, post, errors } = useForm({
        email: '' // Podesi inicijalno stanje forme
    });
    const { props } = usePage();

    // State za unos emaila novog člana
    const [newMemberEmail, setNewMemberEmail] = useState('');

    const handleJoinClub = () => {
        post(route('club.join', club.name));
    };

    const handleAcceptMember = (memberId) => {
        post(route('club.acceptMember', [club.name, memberId]));
    };

    const handleRejectMember = (memberId) => {
        post(route('club.rejectMember', [club.name, memberId]));
    };

   // Funkcija za dodavanje člana
const handleAddMember = (e) => {
    e.preventDefault();

    if (!data.email) {
        console.log("Email nije unesen");
        return;
    }

    console.log("Email za slanje: ", data.email);

    post(route('club.addMember', club.name), {
        onSuccess: () => {
            setData('email', ''); // Resetuj unos nakon uspeha
            console.log('Član uspešno dodat');
        },
        onError: (errors) => {
            console.log(errors); // Proveri greške
        },
    });
};
    
    
    
    
    
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{club.name}</h1>
            {errors.email && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{errors.email}</span>
    </div>
)}

{props.flash?.message && (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
        <strong className="font-bold">Success: </strong>
        <span className="block sm:inline">{props.flash.message}</span>
    </div>
)}

{props.flash?.error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{props.flash.error}</span>
    </div>
)}



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

            {auth && auth.id !== club.user_id && !userIsMember && membershipStatus !== 'pending' && (
                <div className="mt-6">
                    <button
                        onClick={handleJoinClub}
                        className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 ease-in-out shadow-lg"
                    >
                        Join Club
                    </button>
                </div>
            )}

            {membershipStatus === 'pending' && (
                <div className="mt-6">
                    <p className="text-yellow-500 font-semibold">Your request to join the club is pending approval.</p>
                </div>
            )}

            {membershipStatus === 'accepted' && (
                <div className="mt-6">
                    <p className="text-green-500 font-semibold">You are a member of this club.</p>
                </div>
            )}

            {/* Prikaz članova kluba */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Club Members</h2>
                <ul>
                    {clubMembers.map((member) => (
                        <li key={member.id} className="mb-4">
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <p className="text-lg text-gray-700">
                                    {member.user.name} - 
                                    <span className={`ml-2 ${
                                        member.status === 'accepted' ? 'text-green-500' : member.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                                    }`}>
                                        {member.status}
                                    </span>
                                </p>
                                {/* Dugmad za prihvatanje i odbijanje ako je ulogovani korisnik vlasnik kluba i status je 'pending' */}
                                {auth.id === club.user_id && member.status === 'pending' && (
                                    <div className="mt-2">
                                        <button
                                            onClick={() => handleAcceptMember(member.id)}
                                            className="mr-4 inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleRejectMember(member.id)}
                                            className="inline-block px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Forma za dodavanje novih članova */}
            {auth && auth.id === club.user_id && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Member</h2>
                    <form onSubmit={handleAddMember}>
    <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Member Email
        </label>
        <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)} // Setovanje email-a
            required
        />
    </div>
    <button
        type="submit"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
    >
        Add Member
    </button>
    
</form>

                </div>
            )}
        </div>
    );
};

export default ShowClub;
