import React, { useState, useEffect } from 'react';


export default function TournamentList () {
    const [tournament, setTournament] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('http://127.0.0.1:8000/api/tournaments');
          const data = await response.json();
    
          
          if (response.ok && data) {
            setTournament(data);
          }
        }
    
        fetchData();
      }, [])
    
    return (
            <div className="text-center">

      {tournament.length > 0 ? (
        <ul className="flex flex-wrap">
          {tournament.map(tournament => (
            <li 
                className="basis-1/5 mx-6 text-center"
                key={tournament.id}>
                  <img className="m-auto h-20 border rounded" src={`tournament_pics/${tournament.tournament_pic}`}></img>
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