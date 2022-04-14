import { render } from "@testing-library/react";
import { Component, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

/*
state = {
  name: "",
  imageUrl: "",
  pokemonIndex: "",
};

useEffect {
  const { name, url } = this.props;
  const pokemonIndex = url.split("/")[url.split("/").length - 2];
  const imageUrl = `http://pokeapi.co/media/sprites/pokemon/${pokemonIndex}.png`;
  this.setState({ name, imageUrl, pokemonIndex });
}
*/

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

export function List() {
  return (
    <div
      className="flex flex-col items-start min-h-screen p-10 rounded"
      style={{
        backgroundImage:
          "url(https://cdn.eri.gg/2ppB9UtjJiO1jKE6CwcP/download)",
        backgroundSize: "cover",
      }}
    >
      <h1 className="mt-24 text-6xl tracking-widest text-poke-yellow">
        Liste des pokémons
      </h1>
      <p className="mt-5 text-lg text-center text-poke-darkblue">
        Votre pokédex personnel entièrement personnalisable.
      </p>
    </div>
  );
}
