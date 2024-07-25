import React, { useState, useEffect } from 'react';
import TournamentSearch from '@/Pages/Tournaments/Partials/TournamentSearch';

export default function AllTournamentList( { search }) {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        async function fetchTournaments() {
            const response = await fetch('/tournaments-api');
            const result = await response.json();

            if (response.ok && result) {
                setTournaments(result.tournaments);
            } else {
                console.error("Failed to fetch tournaments");
            }
        }

        fetchTournaments();
    }, []);

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                {tournaments.length > 0 ? (
                <table className="min-w-full text-center text-sm font-light text-surface dark:text-white cursor-pointer">
                    <tbody>
                        {tournaments.filter((tournament) => {
                            return search.toLowerCase() === '' ? tournament : tournament.tournament_name.toLowerCase().includes(search);
                        }).map((tournament) => (
                            <tr key={tournament.tournament_id} className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                                {/* <td className="whitespace-nowrap py-2 text-center"><img className="inline h-12 border rounded" src={`tournament_pics/${tournament.tournament_pic}`}></img></td> */}
                                <td className="whitespace-nowrap px-6 py-2">{tournament.tournament_name}</td>
                                <td className="whitespace-nowrap px-6 py-2">{tournament.tournament_date}</td>
                                <td className="whitespace-nowrap px-6 py-2">{tournament.tournament_location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No tournaments found</p>
            )}
                </div>
              </div>
            </div>
        </div>
    );
}
