import React, { useState } from 'react';
import TextInput from '@/Components/TextInput';
import AllTournamentList from '@/Pages/Tournaments/Partials/AllTournamentList';

export default function TournamentSearch() {
    const [searchTournament, setSearchTournament] = useState('');
    console.log(searchTournament);

    return (
        <>
            <div className="pt-6 px-6">
            <div className="grid grid-rows-3 grid-flow-col md:grid-rows-3 gap-4 lg:gap-4">
                {/* Left side - List of Tournaments */}
                <div className="row-span-2 col-span-2 basis-3/4 bg-white overflow-hidden shadow-sm sm:rounded-lg self-start">
                                {/* <h1 className="p-4 text-gray-900 text-2xl">Current Tournaments</h1> */}
                                <div>
                                    <AllTournamentList search = { searchTournament }/>
                                </div>
                            </div>
                    {/* Right side - Search */}
                        <div className="row-span-3 basis-1/4 bg-white overflow-hidden shadow-sm sm:rounded-lg self-start">
                            <form className="">
                                <div>
                                    <TextInput 
                                        className="w-full"
                                        placeholder="Search Tournament"
                                        onChange={(e) => setSearchTournament(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
            </div>
            </div>
        </>
    )
}