import React from 'react';
import css from './App.module.css';
import { getTypeColor, PokemonType, TYPES } from './constants';
import { getEfficacy } from './typeEfficacies';

function getTypeStyle(typeName: PokemonType): React.CSSProperties {
  const color = getTypeColor(typeName);
  return {
    backgroundColor: color.hex(),
    color: color.isDark() ? 'white' : 'black',
  };
}

function App() {
  return (
    <div className={css.root}>
      <table className={css.table}>
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
      </table>
    </div>
  );
}

export default App;
