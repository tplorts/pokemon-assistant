import allPokemon from './all-pokemon.json';
import { PokemonType, TYPES } from './constants';
import { getTypeNameForTypeId } from './types';

export interface Pokemon {
  id: number;
  name: string;
  types: Set<PokemonType>;
}

const normalizedPokemon: Pokemon[] = allPokemon.data.pokemon_v2_pokemon.map((p) => ({
  id: p.id,
  name: p.name,
  types: new Set(p.pokemon_v2_pokemontypes.map((t) => getTypeNameForTypeId(t.type_id))),
}));

const pokemonIndexedByType = normalizedPokemon.reduce(
  (dict, pokemon) => {
    for (const typeName of pokemon.types) {
      dict[typeName].push(pokemon);
    }
    return dict;
  },
  TYPES.reduce((dict, t) => {
    dict[t] = [];
    return dict;
  }, {} as Record<PokemonType, Pokemon[]>)
);

export function getPokemonContainingType(typeName: PokemonType): Pokemon[] {
  return pokemonIndexedByType[typeName];
}
