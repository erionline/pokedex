import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
}

export function Home() {
  return (
    <div
      className="flex flex-col items-start min-h-screen p-10 rounded"
      style={{
        backgroundImage:
          "url(https://cdn.eri.gg/2ppB9UtjJiO1jKE6CwcP/download)",
        backgroundSize: "cover",
      }}
    >
      <h1 className="mt-24 text-6xl tracking-widest title text-poke-yellow">
        My Pokédex
      </h1>
      <p className="mt-5 text-lg text-center text-poke-darkblue">
        Votre pokédex personnel entièrement personnalisable.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-5 text-white">
        <Link to="/list">
          <button className="px-4 py-1 font-bold rounded bg-poke-darkblue">
            Consulter la liste
          </button>
        </Link>
        <button className="px-4 font-bold rounded bg-poke-darkblue">
          Ajouter un pokémon
        </button>
      </div>
    </div>
  );
}

type PokemonList = {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
}

export function List() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [areDetailsShown, setDetailsShown] = useState(false);
  const [pokemons, setPokemons] = useState([] as PokemonList[]);

  const fetchPokemonsFromAPI = async (page_from: number = 0, page_to: number = 50) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page_from}&limit=${page_to}`);
    const data = await response.json();

    const newData : PokemonList[] = [...pokemons];
    
    await data.results.map(async (pokemon: any) => {
      const pokeFetch = await fetch(pokemon.url);
      const pokeData = await pokeFetch.json();
      newData.push({
        id: pokeData.id,
        name: pokeData.name,
        types: pokeData.types.map((t: any) => t.type.name),
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`,
      });
    }) as PokemonList[]

    setTimeout(() => setPokemons(newData), 2500);
    
    return newData;
  };
  
  useEffect(() => {
    fetchPokemonsFromAPI();
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>

    <div
      className={`flex flex-col items-start justify-center min-h-full p-20 rounded md:p-15 ${areDetailsShown ? 'overflow-y-hidden' : ''}`}
      style={{
        backgroundImage:
          "url(https://cdn.eri.gg/2ppB9UtjJiO1jKE6CwcP/download)",
        backgroundSize: "cover",
      }}
    >

      {areDetailsShown && (
        <div className="absolute inset-0 z-50 min-w-full min-h-full text-2xl font-bold text-center bg-black/90 text-poke-yellow">
          BONJOIR
        </div>
      )}

      <h1 className="text-5xl tracking-widest text-poke-yellow title">
        List of Pokémons
      </h1>

      <p className="mt-4 font-mono text-base text-poke-darkblue">There's a list of your first 50 Pokémons available.</p>

      <div className="grid w-full grid-cols-1 gap-4 mt-5 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

        {pokemons.map((pokemon: any) => (
          <div 
            key={pokemon.id} 
            className="flex items-center p-2 text-white transition duration-300 rounded cursor-pointer bg-poke-darkblue hover:bg-opacity-90"
            onClick={() => setDetailsShown(true)}
          >
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <div className="flex flex-col">
              <h3 className="mt-3 text-lg capitalize text-poke-yellow">{pokemon.name}</h3>
              <p className="text-sm capitalize text-poke-darkyellow/90">ID {pokemon.id}</p>
              {/* <p className="text-sm">Type of {pokemon.types.join(", ")}</p> */}
            </div>
          </div>  
        ))}

      </div>

      <button 
        className="px-4 py-1.5 mt-5 font-bold rounded text-poke-yellow bg-poke-darkblue"
        onClick={() => {
          fetchPokemonsFromAPI(pokemons.length, 50);
          // setPokemons({...newData});
        }}
      >
        Load more Pokémons
      </button>

    </div>
    </React.Fragment>
  );
}
