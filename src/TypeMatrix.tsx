import React from 'react';
import styled from 'styled-components';
import { getTypeColor, PokemonType, TYPES } from './constants';
import { getPokemonContainingType, Pokemon } from './pokemon';
import { getEfficacy } from './typeEfficacies';
import { c } from './utilities';

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
      0.25: 'sub',
      0.5: 'sub',
      1: 'par',
      2: 'super',
      4: 'super',
    }[efficacy] ?? ''
  );
}

export function getEfficacyIndicator(efficacy: number): string {
  return (
    {
      0: '∅',
      1: '',
      0.5: '⬇',
      0.25: '⬇⬇',
      2: '⬆',
      4: '⬆⬆',
    }[efficacy] ?? ''
  );
}

export function getEfficacyMultiplier(efficacy: number): string {
  return (
    {
      // 1
      0.5: '½',
      0.25: '¼',
    }[efficacy] ?? efficacy.toString()
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

  let matchingPokemon: Pokemon[] = [];
  if (selectedDefendingTypes.length > 0) {
    matchingPokemon = getPokemonContainingType(selectedDefendingTypes[0]);
    if (selectedDefendingTypes.length > 1) {
      matchingPokemon = matchingPokemon.filter((p) => p.types.has(selectedDefendingTypes[1]));
    }
  }

  return (
    <div>
      <Table className={c(anyTypeSelected && 'hasSelections')}>
        <thead>
          <tr>
            <td colSpan={3} />
            <td colSpan={TYPES.length}>Defending</td>
          </tr>
          <tr>
            <td colSpan={3} />
            {TYPES.map((typeName) => (
              <th
                key={typeName}
                style={getTypeStyle(typeName)}
                className={c('defendingType', isSelected(typeName) && 'selected')}
                onClick={() => toggleDefendingType(typeName)}
              >
                {typeName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TYPES.map((attackingType) => {
            const efficacy =
              selectedDefendingTypes.length > 0
                ? getEfficacy(attackingType, selectedDefendingTypes)
                : null;
            return (
              <tr key={attackingType} className={c(efficacy && `efficacy_${efficacy}`)}>
                <th
                  className={c('efficacyIndicator', efficacy != null && getEfficacyClass(efficacy))}
                >
                  {efficacy != null && getEfficacyIndicator(efficacy)}
                </th>
                <th className="efficacyMultiplier">
                  {efficacy != null && getEfficacyMultiplier(efficacy)}
                </th>
                <th className="attackingType" style={getTypeStyle(attackingType)}>
                  {attackingType}
                </th>
                {TYPES.map((defendingType) => (
                  <td
                    key={defendingType}
                    className={c(
                      getEfficacyClass(getEfficacy(attackingType, [defendingType])),
                      isSelected(defendingType) && 'selected'
                    )}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ul>
        {matchingPokemon.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  tr {
    height: 2rem;
  }
  th {
    font-size: 12px;
  }
  th,
  td {
    text-align: center;
    user-select: none;
  }
  th.defendingType {
    cursor: pointer;
  }
  .efficacyIndicator {
    text-align: right;
    font-size: 1rem;
    &.sub {
      color: #d66;
    }
    &.super {
      color: #6d6;
    }
  }
  tbody td {
    background-color: #666;
    &.none {
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
    th.attackingType {
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
