import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import PlayerCard from '../components/PlayerCard';

function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }


export default function PlayerList() {
    const [error, setError] = useState(null);
    const [dadosPlayers, setData] = useState([]);
  
    const urlBase = "https://poke-liga-backend.vercel.app/ligaGlc";
  
    useEffect(() => {
        fetch(urlBase)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            const transformedPlayers = data.map(player => {
              return {
                name: player.firstname +' '+ player.lastname,
                lastwindate: formatarData(player.lastwindate),
                imageUrl: player.imageUrl, // Corrigi a propriedade para player.imageUrl
                badgesPlayer: [
                  { id: 1, type: 'Water', active: player.badge1 },
                  { id: 2, type: 'Fire', active: player.badge2 },
                  { id: 3, type: 'Grass', active: player.badge3 },
                  { id: 4, type: 'Electric', active: player.badge4 },
                  { id: 5, type: 'Psychic', active: player.badge5 }, 
                  { id: 6, type: 'Fight', active: player.badge6 },
                  { id: 7, type: 'Dark', active: player.badge7 },
                  { id: 8, type: 'Metal', active: player.badge8 },
                  { id: 9, type: 'Dragon', active: player.badge9 },
                  { id: 10, type: 'Colorless', active: player.badge10 },
                ],
              };
            });
    
            setData(transformedPlayers);
          })
          .catch(error => {
            setError(error);
          });
      }, [urlBase]);
  


  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Grid container spacing={2} justifyContent="center">
          {dadosPlayers.map((player, index) => (
            <Grid item key={index}>
              <PlayerCard {...player} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};