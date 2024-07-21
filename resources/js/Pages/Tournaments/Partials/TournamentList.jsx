import React, { useState, useEffect } from 'react';


export default function TournamentList () {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        async function fetchTournaments() {
          const response = await fetch('/tournaments-api');
          const result = await response.json();
    
          
          if (response.ok && result) {
            setTournaments(result);
          }
        }
    
        fetchTournaments();
      }, [])
    
    return (
            <div className="text-center">

      {tournaments.length > 0 ? (
        <ul className="flex flex-wrap">
          {tournaments.map(tournament => (
            <li 
                className="basis-1/5 mx-6 text-center"
                key={tournament.id}>
                  {/* <img className="m-auto h-20 border rounded" src={`tournament_pics/${data.tournament_pic}`}></img> */}
                  {tournament.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tournaments found</p>
      )}

    </div>
    )
}