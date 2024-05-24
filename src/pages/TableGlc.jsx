import React from 'react';
import { Box, Container } from '@material-ui/core';
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
      <Container style={{ display: 'flex', justifyContent: 'center'}}>
        <Box display="flex" flexDirection="column" mt={2} width="80%" >
          {players.map((player, index) => (
            <Box key={index} mb={2} mt={index === 0 ? 2 : 0} width="100%">
              <PlayerCard {...player} />
            </Box>
          ))}
        </Box>
      </Container>
    );
  };
  
  export default PlayerList;