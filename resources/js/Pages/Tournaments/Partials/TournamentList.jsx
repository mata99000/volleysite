import React, { useState, useEffect } from 'react';

export default function TournamentList() {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        async function fetchTournaments() {
            const response = await fetch('/tournaments-api');
            const result = await response.json();

            if (response.ok && result) {
                console.log(result); // Dodato za debagovanje
                setTournaments(result.data); // Uveri se da koristis odgovarajući ključ iz JSON odgovora
            } else {
                console.error("Failed to fetch tournaments");
            }
        }

        fetchTournaments();
    }, []);

    return (
        <div className="text-center">
            {tournaments.length > 0 ? (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tournaments.map((tournament, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{tournament.tournament_name}</td>
                                <td className="border px-4 py-2">{tournament.tournament_date}</td>
                                <td className="border px-4 py-2">{tournament.tournament_location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No tournaments found</p>
            )}
        </div>
    );
}
