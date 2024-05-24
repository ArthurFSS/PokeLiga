import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import PlayerCard from '../components/PlayerCard';

const players = [
  {
    name: 'Andrew Dias (Dados Fake)',
    lastVictoryDate: '2024-05-24',
    imageUrl: 'url-to-image-1',
    statuses: [true, false, true, false, true, false, true, false, true],
  },
  {
    name: 'Arthur Angelo (Dados Fake)',
    lastVictoryDate: '2024-05-22',
    imageUrl: 'url-to-image-2',
    statuses: [false, true, false, true, false, true, false, true, false],
  },
  {
    name: 'Cramorant (Dados Fake)',
    lastVictoryDate: '2024-05-22',
    imageUrl: 'url-to-image-2',
    statuses: [true, true, true, true, true, true, true, true, true],
  },
  // Adicione mais jogadores conforme necessário
];

const PlayerList = () => {
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Grid container spacing={2} justifyContent="center">
          {players.map((player, index) => (
            <Grid item key={index}>
              <PlayerCard {...player} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PlayerList;
