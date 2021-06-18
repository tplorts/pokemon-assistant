import Color from 'color';

export const TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
] as const;

export type PokemonType = typeof TYPES[number];

const TYPE_COLOR_DICT: Record<PokemonType, Color> = {
  normal: Color('#A8A878'),
  fire: Color('#F08030'),
  water: Color('#6890F0'),
  electric: Color('#F8D030'),
  grass: Color('#78C850'),
  ice: Color('#98D8D8'),
  fighting: Color('#C03028'),
  poison: Color('#A040A0'),
  ground: Color('#E0C068'),
  flying: Color('#A890F0'),
  psychic: Color('#F85888'),
  bug: Color('#A8B820'),
  rock: Color('#B8A038'),
  ghost: Color('#705898'),
  dragon: Color('#7038F8'),
  dark: Color('#705848'),
  steel: Color('#B8B8D0'),
  fairy: Color('#EE99AC')
};

export function getTypeColor(typeName: PokemonType): Color {
  return TYPE_COLOR_DICT[typeName];
}
