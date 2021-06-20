import React from 'react';
import styled from 'styled-components';
import { getTypeColor, PokemonType, TYPES } from './constants';
import { getEfficacy } from './typeEfficacies';

function getTypeStyle(typeName: PokemonType): React.CSSProperties {
  const color = getTypeColor(typeName);
  return {
    backgroundColor: color.hex(),
    color: color.isDark() ? 'white' : 'black',
  };
}

export default function App() {
  return (
    <Root>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th colSpan={TYPES.length}>Defending</th>
          </tr>
          <tr>
            <th></th>
            {TYPES.map((typeName) => (
              <th key={typeName} style={getTypeStyle(typeName)}>
                {typeName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TYPES.map((attackingType) => (
            <tr key={attackingType}>
              <th style={getTypeStyle(attackingType)}>{attackingType}</th>
              {TYPES.map((defendingType) => (
                <td key={defendingType}>{getEfficacy(attackingType, defendingType)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Root>
  );
}

const Root = styled.div`
  padding: 1rem;
`;

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  th {
    font-size: 12px;
    padding: 0.75em 0;
  }
  td {
    text-align: center;
  }
`;
