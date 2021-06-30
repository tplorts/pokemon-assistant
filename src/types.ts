import _ from 'lodash';
import { PokemonType } from './constants';
import EFFICACIES from './type-efficacies.json';

const typeNameMap = _.mapValues(_.keyBy(EFFICACIES.data.pokemon_v2_type, 'id'), 'name');
const typeIdMap = _.fromPairs(_.toPairs(typeNameMap).map(([id, name]) => [name, parseInt(id)]));

export function getTypeNameForTypeId(typeId: number): PokemonType {
  return typeNameMap[typeId] as PokemonType;
}

export function getTypeIdForTypeName(typeName: PokemonType): number {
  return typeIdMap[typeName];
}
