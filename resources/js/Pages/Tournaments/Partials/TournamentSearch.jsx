import React, { useState } from 'react';
import TextInput from '@/Components/TextInput';
import AllTournamentList from '@/Pages/Tournaments/Partials/AllTournamentList';
import DropdownByGender from '@/Components/DropdownByGender';
import DropdownBySurface from '@/Components/DropdownBySurface';

export default function TournamentSearch() {
    const [searchTournament, setSearchTournament] = useState('');
    console.log(searchTournament);

    return (
        <>
            <div 
                className="col-span-2 scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent 
                dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex 
                motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
            >
                
                    <AllTournamentList  search = { searchTournament }
                                        className="table-fixed"/>

            </div>

            <div
                className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
            >
                    <div className="w-full">
                    <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                            Search Tournament
                    </h2>
                        <div>
                        <TextInput
                                type="text"
                                placeholder=""
                                onChange={(e) => setSearchTournament(e.target.value)}
                                className="w-full mb-6"
                        />
                        </div>
                        <div>
                            <DropdownByGender className="w-full border-transparent focus:border-transparent focus:ring-0"/>
                        </div>
                        <div>
                            <DropdownBySurface className="w-full border-transparent focus:border-transparent focus:ring-0"/>
                        </div>
                    </div>
                                
            </div>
        </>
    )
}