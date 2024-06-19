import React from 'react';
import { Avatar, Box, Typography, Grid } from '@material-ui/core';
import energy_eletric from '../assets/energy_eletric.png';
import energy_fire from '../assets/energy_fire.png';
import energy_water from '../assets/energy_water.png';
import energy_grass from '../assets/energy_grass.png'; 
import energy_dragon from '../assets/energy_dragon.png';
import energy_psich from '../assets/energy_psich.png';
import energy_dark from '../assets/energy_dark.png';
import energy_metal from '../assets/energy_metal.png';
import energy_fight from '../assets/energy_fight.png';
import energy_colorless from '../assets/energy_colorless.png';
import energy_gray from '../assets/energy_gray.png';

const badges = [
  { id: 1, type:'Water', active: false, imageUrl: energy_water},
  { id: 2, type:'Fire', active: false, imageUrl: energy_fire},
  { id: 3, type:'Grass', active: false , imageUrl: energy_grass},
  { id: 4, type:'Eletric', active: false, imageUrl: energy_eletric},
  { id: 5, type:'Psich', active: false, imageUrl: energy_psich},
  { id: 6, type:'Fight', active: false, imageUrl: energy_fight},
  { id: 7, type:'Dark', active: false, imageUrl: energy_dark},
  { id: 8, type:'Metal', active: false, imageUrl: energy_metal},
  { id: 9, type:'Dragon', active: false, imageUrl: energy_dragon},
  { id: 10, type:'Colorless', active: false, imageUrl: energy_colorless},
];

const PlayerCard = ({ name, lastwindate, imageUrl, badgesPlayer }) => {
    return (
      <Box
        style={{
          width: '340px',
          border: '1px solid black',
          borderRadius: '8px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          margin: '10px',
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Avatar src={imageUrl} style={{ width: '100px', height: '100px' }} />
          <Typography variant="subtitle1" just>{name}</Typography>
          <Typography variant="caption">Ultima vitória: {lastwindate}</Typography>
          <Grid container spacing={1} justifyContent="center" style={{ marginTop: '10px' }}>
            {badges.map((badge, index) => (
              <Grid item key={index} xs={2}>
                <img
                  src={badgesPlayer[index].active ? badge.imageUrl : energy_gray}
                  alt={`Insignia ${badge.type}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default PlayerCard;