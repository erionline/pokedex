import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

it('loads all pokemons from the API and adds them to the localStorage', () => {
  render(<App />);
  setTimeout(() => {
    const store = localStorage.getItem("pokemons");
    expect(store?.length).toBeGreaterThanOrEqual(50);
  }, 3000);
});


it('adds a pokemon to the list', () => {
  render(<App />);
  let amount = document.getElementById('amountDisplayedPokemons')?.innerHTML;

  let pokeName = document.getElementById('addPokeName')?.innerHTML;
  let pokeType = document.getElementById('addPokeType')?.innerHTML;
  let pokeUrl = document.getElementById('addPokeURL')?.innerHTML;

  let addButton = document.getElementById('addButton') as HTMLButtonElement;

  pokeName = 'Pikachu';
  pokeType = 'Electric';
  pokeUrl = 'https://pbs.twimg.com/profile_images/1510973090737672201/ECBkbFDV_400x400.jpg';

  fireEvent.click(addButton);
  
  expect(amount).toBe("51");

});
