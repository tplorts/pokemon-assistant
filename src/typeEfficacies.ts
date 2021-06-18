import _ from 'lodash';
import { PokemonType } from './constants';
import EFFICACIES from './type-efficacies.json';

const typeIdMap = _.mapValues(_.keyBy(EFFICACIES.data.pokemon_v2_type, 'id'), 'name');

const typeEfficaciesMap = _.chain(EFFICACIES.data.pokemon_v2_type)
  .keyBy('name')
  .mapValues('pokemon_v2_typeefficacies')
  .mapValues((efficacyArray) =>
    _.chain(efficacyArray)
      .map(({ target_type_id, ...e }) => ({ ...e, typeName: typeIdMap[target_type_id] }))
      .keyBy('typeName')
      .mapValues(({ damage_factor }) => damage_factor / 100)
      .value()
  )
  .value();

console.log(typeEfficaciesMap);

export function getEfficacy(attacking: PokemonType, defending: PokemonType): number {
  return typeEfficaciesMap[attacking][defending];
}
