import React from 'react';
import styled from 'styled-components';
import TypeMatrix from './TypeMatrix';

export default function App() {
  return (
    <Root>
      <TypeMatrix />
    </Root>
  );
}

const Root = styled.div`
  padding: 1rem;
`;
