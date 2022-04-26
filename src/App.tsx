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
  const [pokemons, setPokemons] = useState([] as PokemonList[]);

  const newData : PokemonList[] = [];

  useEffect(() => {
    const fetchPokemonsFromAPI = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
      const data = await response.json();
      
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
    };
    
    fetchPokemonsFromAPI();
    setPokemons(newData);
    
    setIsLoaded(true);
  }, []);

  console.log("POKEMONS", pokemons);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col items-start min-h-screen p-10 rounded"
      style={{
        backgroundImage:
          "url(https://cdn.eri.gg/2ppB9UtjJiO1jKE6CwcP/download)",
        backgroundSize: "cover",
      }}
    >
      <h1 className="mt-24 text-6xl tracking-widest text-poke-yellow title">
        Liste des pokémons
      </h1>

      <div className="grid grid-cols-5 gap-4 mt-5 text-white">

        {pokemons.map((pokemon: any) => (
          <div key={pokemon.id} className="p-2 text-white rounded bg-poke-darkblue">
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <h3 className="mt-3 text-lg text-poke-yellow">{pokemon.name}</h3>
            {/* <p className="text-sm">Type of {pokemon.types.join(", ")}</p> */}
          </div>  
        ))}

      </div>

    </div>
  );
}
