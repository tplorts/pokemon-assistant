import _ from 'lodash';
import { PokemonType } from './constants';
import EFFICACIES from './type-efficacies.json';
import { getTypeNameForTypeId } from './types';

const typeEfficaciesMap = _.chain(EFFICACIES.data.pokemon_v2_type)
  .keyBy('name')
  .mapValues('pokemon_v2_typeefficacies')
  .mapValues((efficacyArray) =>
    _.chain(efficacyArray)
      .map(({ target_type_id, ...e }) => ({
        ...e,
        typeName: getTypeNameForTypeId(target_type_id),
      }))
      .keyBy('typeName')
      .mapValues(({ damage_factor }) => damage_factor / 100)
      .value()
  )
  .value();

export function getEfficacy(attacking: PokemonType, defendingTypes: PokemonType[]): number {
  const attackerEfficacies = typeEfficaciesMap[attacking];
  return defendingTypes.reduce(
    (efficacyProduct, defendingType) => efficacyProduct * attackerEfficacies[defendingType],
    1
  );
}
