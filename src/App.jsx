import { useState } from 'react';
import AllPlayers from './components/AllPlayers.jsx';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer]);
  };

  const handleDeletePlayer = (id) => {
    const updatedPlayers = players.filter(player => player.id !== id);
    setPlayers(updatedPlayers); 
  };

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
  };

  return (
    <div className="wrapper">
      <div className="create-player-form">
        <h2>Create New Player</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.elements.name.value;
            const newPlayer = { id: Date.now(), name }; // Assign a unique ID (e.g., using Date.now())
            handleAddPlayer(newPlayer);
            e.target.reset();
          }}
        >
          <input type="text" name="name" placeholder="Enter player name" required />
          <button type="submit">Add Player</button>
        </form>
      </div>
      <div className="search-bar">
        <h2>Search Player</h2>
        <input
        type="text"
        placeholder="Search by name..."
        vaule={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        />
        </div>
      <AllPlayers 
      players={players} 
      onDeletePlayer={handleDeletePlayer} 
      searchTerm= {searchTerm}
      />
    </div>
  );
}

export default App;