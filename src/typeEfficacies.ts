import _ from 'lodash';
import { PokemonType } from './constants';
import EFFICACIES from './type-efficacies.json';

const typeNameMap = _.mapValues(_.keyBy(EFFICACIES.data.pokemon_v2_type, 'id'), 'name');
const typeIdMap = _.fromPairs(_.toPairs(typeNameMap).map(([id, name]) => [name, parseInt(id)]));

export function getTypeNameForTypeId(typeId: number):PokemonType {
  return typeNameMap[typeId] as PokemonType;
}

export function getTypeIdForTypeName(typeName: PokemonType):number {
  return typeIdMap[typeName];
}

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

export function getEfficacy(
  attacking: PokemonType,
  defendingTypes: (PokemonType | null)[]
): number {
  return defendingTypes.reduce(
    (efficacyProduct, defendingType) =>
      efficacyProduct * (defendingType == null ? 1 : typeEfficaciesMap[attacking][defendingType]),
    1
  );
}
