import React from 'react';
import styled from 'styled-components';
import TypeMatrix from './TypeMatrix';

export default function App() {
  return (
    <Root>
      <TypeMatrix />
      <MatchingPokemonList />
    </Root>
  );
}

function MatchingPokemonList() {
  return null;
}

const Root = styled.div`
  padding: 1rem;
`;
