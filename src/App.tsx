import { useState } from 'react';
import './App.css';

const [page, setPage] = useState({
  current: () => Home,
});

const Home = () => {
  return (
    <div 
      className="flex flex-col items-start min-h-screen p-10 rounded"
      style={{
        backgroundImage: "url(https://cdn.eri.gg/2ppB9UtjJiO1jKE6CwcP/download)",
        backgroundSize: "cover",
      }}
    >
      <h1 
        className="mt-24 text-6xl tracking-widest title text-poke-yellow"
      >
        My Pokédex
      </h1>
      <p className="mt-5 text-lg text-center text-poke-darkblue">
        Votre pokédex personnel entièrement personnalisable.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-5 text-white">
        <button 
          className="px-4 py-1 font-bold rounded bg-poke-darkblue"
          onClick={() => setPage({ current: () => List })}
        >
          Consulter la liste
        </button>
        <button className="px-4 font-bold rounded bg-poke-darkblue">
          Ajouter un pokémon
        </button>
      </div>
    </div>
  );
}

const List = () => {
  return (
    <div 
      className="flex flex-col items-start min-h-screen p-10 rounded"
      style={{
        backgroundImage: "url(https://cdn.eri.gg/2ppB9UtjJiO1jKE6CwcP/download)",
        backgroundSize: "cover",
      }}
    >
    <h1 
      className="mt-24 text-6xl tracking-widest text-poke-yellow"
    >
      Liste des pokémons
    </h1>
    <p className="mt-5 text-lg text-center text-poke-darkblue">
      Votre pokédex personnel entièrement personnalisable.
    </p>
  </div>
  );
}

const App = () => {
  return <page.current />;
}

export default App;