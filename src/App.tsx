import React, { useEffect, useState } from 'react';
import PokemonContainer from './components/PokemonContainer';
const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

function App() {
  const [pokemon, setPokemon] = useState(null)

  const fetchPokemon = async (pokemonName: string) => {
    const fetched = await P.getPokemonByName(pokemonName)
    setPokemon(fetched)
  }

  useEffect(() => {
    fetchPokemon('kadabra')
  }, [])

  return (
    <div className="App">
      <PokemonContainer pokemon={pokemon} />
    </div>
  );
}

export default App;
