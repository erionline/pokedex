import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

import * as Icon from "./components/Icons";

let store = localStorage.getItem("pokemons");

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/list/new" element={<AddPokemon />} />
    </Routes>
  );
}

export function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-10 rounded"
      style={{
        backgroundSize: "cover",
        backgroundImage:
          "url(https://cdn.eri.gg/2ppB9UtjJiO1jKE6CwcP/download)",
      }}
    >
      <h1 className="text-6xl tracking-widest title-blue text-poke-yellow">
        My Pokédex
      </h1>
      <p className="mt-5 text-xl font-bold text-center text-poke-darkblue">
        Your own & fully customizable Pokédex!
      </p>
      <div className="flex justify-center w-full mt-5 space-x-4 text-center text-white xs/p-4">
        <Link to="/list" className="flex flex-col justify-center xs:w-full sm:w-1/2 md:1/4 lg:w-1/6 h-[12rem] w-full p-5 rounded-lg bg-poke-darkblue hover:bg-opacity-95">
          <Icon.Pokeball className="self-center w-20 h-20 text-red-500" />
          <p className="mt-2 font-bold">Check your Pokédex</p>
        </Link>
        <Link to="/list" className="flex flex-col justify-center xs:w-full sm:w-1/2 md:1/4 lg:w-1/6 w-full p-5 rounded-lg h-[12rem] bg-poke-darkblue">
        <Icon.Pokeball className="self-center w-20 h-20 text-poke-yellow" />
          <p className="mt-2 font-bold">Add a Pokémon</p>
        </Link>
      </div>
    </div>
  );
}

export function AddPokemon() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-10 rounded"
      style={{
        backgroundImage:
          "url(https://cdn.eri.gg/2ppB9UtjJiO1jKE6CwcP/download)",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-6xl tracking-widest title-blue text-poke-yellow">
        My Pokédex
      </h1>
      <p className="mt-5 text-xl font-bold text-center text-poke-darkblue">
        Your own & fully customizable Pokédex!
      </p>
      <div className="flex justify-center w-full mt-5 space-x-4 text-center text-white xs/p-4">
        <Link to="/list" className="flex flex-col justify-center xs:w-full sm:w-1/2 md:1/4 lg:w-1/6 h-[12rem] w-full p-5 rounded bg-poke-darkblue">
          <Icon.Pokeball className="self-center w-20 h-20 text-red-500" />
          <p className="font-bold">Check your Pokédex</p>
        </Link>
        <Link to="/list" className="flex flex-col justify-center xs:w-full sm:w-1/2 md:1/4 lg:w-1/6 w-full p-5 rounded h-[12rem] bg-poke-darkblue">
        <Icon.Pokeball className="self-center w-20 h-20 text-poke-yellow" />
          <p className="font-bold">Add a Pokémon</p>
        </Link>
      </div>
    </div>
  );
}

type PokemonList = {
  name: string;
  type: PokemonType;
  pokemonTypes: string[];
  imageUrl: string;
}

enum PokemonType {
  LOADING = "LOADING",
  DEFAULT = "DEFAULT",
  CUSTOM = "CUSTOM",
}

enum Theme {
  BLUE = "BLUE",
  RED = "RED",
}

export function List() {

  const [pokemons, setPokemons] = useState([] as PokemonList[]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [settings, setSettings] = useState({
    theme: Theme.BLUE, 
    filterByCustom: false,
    detailsShown: false
  });

  const fetchPokemonsFromAPI = async (page_from: number = 0, page_to: number = 50) => {
    // Data is not available yet, enable the loading state
    setIsLoaded(false);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page_from}&limit=${page_to}`);
    const data = await response.json();

    const newData : PokemonList[] = [...pokemons];
    
    await data.results.map(async (pokemon: any) => {
      const pokeFetch = await fetch(pokemon.url);
      const pokeData = await pokeFetch.json();
      newData.push({
        name: pokeData.name,
        type: PokemonType.DEFAULT,
        pokemonTypes: pokeData.types[0].type.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`,
      });
    }) as PokemonList

    return newData;
  };

  const getPokemons = async (page_from: number = 0, page_to: number = 50, clickedOnMorePokemons: boolean = false) => {
    let api = await fetchPokemonsFromAPI(pokemons.length, page_to);

    /* FETCHING FROM THE API: 
    * IF the data is not in localStorage (likely it's the first time the app is loaded)
    * OR if all of the pokemons are not saved inside the state yet (custom pokemons added but not all data fetched yet)
    * OR if the current amount of pokemons is equal to the page we are requesting from (page_from) (meaning we want to load more pokemons)
    * THEN fetch the data from the API, set to localStorage and to the state */

    if (store && store.length < 50) { // No data in localStorage yet, SET right now
      localStorage.setItem("pokemons", JSON.stringify(api));
      setPokemons(api as PokemonList[]);
    } else if (clickedOnMorePokemons) { // We want to load more pokemons
      if (store && store.length > 50) localStorage.setItem("pokemons", JSON.stringify(api));
      setPokemons([...pokemons, ...api]);
    } else {
      setPokemons(JSON.parse(localStorage.getItem("pokemons") as string));
    }

    setTimeout(() => setIsLoaded(true), 2000);
  };

  // const addPokemon = () => {

  // };
    
  
  useEffect(() => {
    getPokemons()
  }, []);

  if (!isLoaded) {
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-poke-darkblue">
      <Icon.Loading className="text-white w-28 h-28 animate-spin" />
      <h1 className="mt-5 text-2xl font-bold leading-none text-center text-poke-yellow">Loading...</h1>
      <p className="mt-2 font-light text-center text-white">
        We are retrieving data from your Pokédex.
      </p>
    </div>
    );
  }

  setTimeout(() => {
    if (pokemons.length > 50) {
      let elem = document.getElementById(`pokemon-${pokemons.length-49}`)
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, 2500);

  return (
    <React.Fragment>
      
    <div
      className={`flex flex-col items-start justify-center min-h-screen p-20 rounded md:p-15`}
      style={{
        backgroundImage: "url(https://cdn.eri.gg/2ppB9UtjJiO1jKE6CwcP/download)",
        backgroundSize: "cover",
      }}
    > 
      <div className="flex justify-between w-full space-x-8">
        <h1 className={`text-5xl tracking-widest title-blue text-poke-yellow`}>
            Your Pokémons
        </h1>
        <Link to="/">
          <Icon.Back className={`w-12 h-12 p-1 rounded-full border-2 ${settings.theme === Theme.BLUE ? "bg-poke-darkblue text-poke-yellow border-poke-yellow" : "bg-poke-yellow text-poke-darkblue border-poke-darkblue"}`}/>
        </Link>
      </div>

      <div className="flex justify-between w-full mt-2 space-x-8">
        <p className={`font-bold self-center text-base text-poke-darkblue`}>
          Displaying your list of <span id="amountDisplayedPokemons">{pokemons.length}</span> Pokémons available.
        </p>

        <div
          className="flex space-x-2 rounded-full text-poke-darkblue"
        >
        <div
          className="flex space-x-2 rounded-full text-poke-darkblue"
        >
          <p className={`self-center py-1 font-bold rounded text-poke-darkblue`}>
            { settings.theme === Theme.BLUE ? "Yellow theme" : "Dark blue theme" }
          </p>
          <button onClick={() => (setSettings({ ...settings, theme: settings.theme === Theme.BLUE ? Theme.RED : Theme.BLUE }))}>
            <Icon.ToggleOff className={`w-12 h-12 p-1 ${settings.theme === Theme.BLUE ? "hidden" : "block"}`} />
            <Icon.ToggleOn className={`w-12 h-12 p-1 ${settings.theme === Theme.BLUE ? "block" : "hidden"}`} />
          </button>
        </div>
        <p className={`self-center py-1 font-bold rounded text-poke-darkblue`}>
            Filter Custom Pokémons
          </p>
          <button onClick={() => null}>
            <Icon.ToggleOff className={`w-12 h-12 p-1 ${settings.theme === Theme.BLUE ? "hidden" : "block"}`} />
            <Icon.ToggleOn className={`w-12 h-12 p-1 ${settings.theme === Theme.BLUE ? "block" : "hidden"}`} />
          </button>
        </div>
      </div>

      {/* Add new pokemons to the pokemons list */}
      <h3 className={`text-3xl font-bold text-poke-darkblue`}>
        Add a new Pokémon
      </h3>
      <form className="flex w-full mt-2 space-x-4">
        <input
          id="addPokeName"
          className="w-1/5 p-2 rounded-sm"
          type="text"
          placeholder="Enter the name of the Pokémon"
          required
        />
        <input
          id="addPokeType"
          className="w-1/5 p-2 rounded-sm"
          type="text"
          placeholder="Type of the Pokémon"
          required
        />
        <input
          id="addPokeURL"
          className="w-1/5 p-2 rounded-sm"
          type="text"
          placeholder="Image URL of the Pokémon"
          required
        />
        <button 
          className={`w-1/12 p-2 rounded-sm ${settings.theme === Theme.BLUE ? "bg-poke-darkblue text-poke-yellow" : "bg-poke-yellow text-poke-darkblue"}`}
          id="addButton"
          onClick={() => {
            let n = (document.getElementById("addPokeName") as HTMLInputElement)
            let t = (document.getElementById("addPokeType") as HTMLInputElement)
            let u = (document.getElementById("addPokeURL") as HTMLInputElement)
        
            if (n.value.length === 0 || t.value.length === 0 || u.value.length === 0) {
              alert("You must fill out all the fields to add a Pokémon!");
              return;
            }
        
            let newCustomPokemons : PokemonList[] = [{ name: n.value, type: PokemonType.CUSTOM, pokemonTypes: [t.value], imageUrl: u.value }];
        
            localStorage.setItem("pokemons", JSON.stringify([...newCustomPokemons, ...pokemons] as PokemonList[]));
            setTimeout(() => setPokemons([...newCustomPokemons, ...pokemons] as PokemonList[]), 1000);

            n.value = "";
            t.value = "";
            u.value = "";
          }}
        >
          Add
        </button>
      </form>
        

      <div className="grid w-full grid-cols-1 gap-4 mt-5 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {pokemons.map((pokemon: PokemonList, index: number) => (
          <div
            id={"pokemon-"+(index+1)}
            key={index+1} 
            className={`relative flex items-center p-4 text-white transition duration-300 space-x-2 rounded cursor-pointer border-2 hover:scale-110 ${settings.theme === Theme.BLUE ? "bg-poke-darkblue text-poke-yellow border-poke-yellow" : "bg-poke-yellow text-poke-darkblue border-poke-darkblue"}`}
          >
            <div 
              className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 overflow-hidden font-extrabold text-white bg-red-500 rounded-bl hover:bg-red-600"
              onClick={() => {
                let newPokemons : PokemonList[] = [...pokemons];
                newPokemons.splice(index, 1);
                localStorage.setItem("pokemons", JSON.stringify(newPokemons));
                setPokemons(newPokemons);
              }}
            >
              x
            </div>
            <img src={pokemon.imageUrl} alt={pokemon.name} className="w-20 h-20" />
            <div className="flex flex-col capitalize">
              <h3 className={`mt-3 text-lg font-bold ${settings.theme === Theme.BLUE ? "text-poke-yellow" : "text-poke-darkblue"}`}>{pokemon.name}</h3>
              <p className={`text-sm ${settings.theme === Theme.BLUE ? "text-poke-darkyellow/90" : "text-poke-darkblue/90"} text-poke-darkyellow/90`}>ID {index+1}</p>
              <p className={`text-xs ${settings.theme === Theme.BLUE ? "text-poke-darkyellow/90" : "text-poke-darkblue/90"} text-poke-darkyellow/90`}>Type {pokemon.pokemonTypes}</p>
            </div>
          </div>  
        ))}
      </div>

      <button 
        className={`px-5 py-1.5 mt-5 font-bold rounded ${settings.theme === Theme.BLUE ? "bg-poke-darkblue text-poke-yellow" : "bg-poke-yellow text-poke-darkblue"}`}
        onClick={() => getPokemons(pokemons.length, 50, true)}
      >
        Load more Pokémons
      </button>

    </div>
    </React.Fragment>
  );
}
