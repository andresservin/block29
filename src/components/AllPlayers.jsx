import { useEffect, useState } from 'react';
import {getAllPlayers} from '../api/index.js';
import './AllPlayers.css';

function AllPlayers({onDeletePlayer}) {
    const [players, setPlayers]= useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const playersData = await getAllPlayers();
                setPlayers(playersData);
                setLoading(false);
            } catch (error){
                setLoading(false);
                setError(error);
            }
        };

        fetchPlayers();
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchTerm(searchText);
        const filtered = players.filter(player =>
          player.name.toLowerCase().includes(searchText)
        );
        setFilteredPlayers(filtered);
      };
    
      const handleDelete = (id) => {
        const updatedPlayers = players.filter(player => player.id !== id);
        setPlayers(updatedPlayers);
        setFilteredPlayers(updatedPlayers);
        onDeletePlayer(id); // Optional: Invoke callback to perform server-side delete
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const breed = formData.get('breed');
        const status = formData.get('status');
        const imageUrl = formData.get('imageUrl');
    
        const newPlayer = {
          id: Date.now(), // Temporary unique ID (replace with server-generated ID)
          name,
          breed,
          status,
          imageUrl
        };
    
        setPlayers([...players, newPlayer]);
        setFilteredPlayers([...filteredPlayers, newPlayer]);
        onCreatePlayer(newPlayer); // Optional: Invoke callback to perform server-side create
    
        e.target.reset();
      };

    if (error) {
        return <p>Error: {error.message}</p>;
      }
    
      if (isLoading) {
        return <p>Loading...</p>;
      }

      const displayPlayers = searchTerm ? filteredPlayers: players;

      return (
        <div className="all-players-container">
      {players.length === 0 ? (
        <p>No players found</p>
      ) : (
        displayPlayers.map((player) => (
          <div className="player-container" key={player.id}>
            <ul>
              <li>ID: {player.id}</li>
              <li>Name: {player.name}</li>
              <li>Breed: {player.breed}</li>
              <li>Status: {player.status}</li>
            </ul>
            {player.imageUrl && <img src={player.imageUrl} alt="Player" />}
            <button onClick={() => handleDelete(player.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}


export default AllPlayers;