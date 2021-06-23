import React from 'react';
import styled from 'styled-components';
import { getTypeColor, PokemonType, TYPES } from './constants';
import { getEfficacy, getTypeIdForTypeName } from './typeEfficacies';
import { areSetsEqual, c } from './utilities';
import allPokemon from './all-pokemon.json';

function getTypeStyle(typeName: PokemonType): React.CSSProperties {
  const color = getTypeColor(typeName);
  return {
    backgroundColor: color.hex(),
    color: color.isDark() ? 'white' : 'black',
  };
}

function getEfficacyClass(efficacy: number): string {
  return (
    {
      0: 'none',
      0.5: 'sub',
      1: 'par',
      2: 'super',
    }[efficacy] ?? ''
  );
}

export default function TypeMatrix() {
  const [selectedDefendingTypes, setSelectedDefendingTypes] = React.useState<PokemonType[]>([]);
  const anyTypeSelected = selectedDefendingTypes.length > 0;

  const isSelected = (typeName: PokemonType) => selectedDefendingTypes.includes(typeName);

  const toggleDefendingType = (typeName: PokemonType) => {
    if (isSelected(typeName)) {
      setSelectedDefendingTypes((prior) => prior.filter((t) => t !== typeName));
    } else {
      setSelectedDefendingTypes((prior) => {
        const next = prior.concat(typeName);
        if (next.length > 2) {
          next.splice(0, 1);
        }
        return next;
      });
    }
  };

  let matchingPokemon: string[] = [];
  if (selectedDefendingTypes.length === 2) {
    const typeIds = new Set(selectedDefendingTypes.map(getTypeIdForTypeName));
    matchingPokemon = allPokemon.data.pokemon_v2_pokemon
      .filter((p) => {
        const pTypeIds = new Set(p.pokemon_v2_pokemontypes.map((t) => t.type_id));
        return areSetsEqual(typeIds, pTypeIds);
      })
      .map((p) => p.name);
  }

  return (
    <div>
      <Table className={c(anyTypeSelected && 'hasSelections')}>
        <thead>
          <tr>
            <td />
            <td />
            <td colSpan={TYPES.length}>Defending</td>
          </tr>
          <tr className="defending">
            <td />
            <td />
            {TYPES.map((typeName) => (
              <th
                key={typeName}
                style={getTypeStyle(typeName)}
                className={c('defending', isSelected(typeName) && 'selected')}
                onClick={() => toggleDefendingType(typeName)}
              >
                {typeName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TYPES.map((attackingType) => {
            return (
              <tr key={attackingType}>
                <th>{anyTypeSelected && getEfficacy(attackingType, selectedDefendingTypes)}</th>
                <th className="attacking" style={getTypeStyle(attackingType)}>
                  {attackingType}
                </th>
                {TYPES.map((defendingType) => {
                  const efficacy = getEfficacy(attackingType, [defendingType]);
                  return (
                    <td
                      key={defendingType}
                      className={c(
                        getEfficacyClass(efficacy),
                        isSelected(defendingType) && 'selected'
                      )}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        {matchingPokemon.map((p) => (
          <div key={p}>{p}</div>
        ))}
      </div>
    </div>
  );
}

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  th {
    font-size: 12px;
    padding: 0.75em 0;
  }
  th,
  td {
    text-align: center;
    user-select: none;
  }
  th.defending {
    cursor: pointer;
  }
  tbody td {
    background-color: #666;
    &.none {
      /* background-color: #555; */
      &::after {
        content: '∅';
      }
    }
    &.sub {
      color: #d66;
      &::after {
        content: '⬇';
      }
    }
    &.super {
      color: #6d6;
      &::after {
        content: '⬆';
      }
    }
  }
  &.hasSelections {
    th.defending:not(.selected),
    tbody td:not(.selected) {
      opacity: 0.4;
    }
    th.attacking {
      opacity: 0.8;
    }
    tbody tr:hover {
      td,
      th {
        opacity: 1;
      }
    }
  }
`;
