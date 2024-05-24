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
  { type:'Fire', active: false, imageUrl: energy_fire},
  { type:'Water', active: false, imageUrl: energy_water},
  { type:'Grass', active: false , imageUrl: energy_grass},
  { type:'Dragon', active: false, imageUrl: energy_dragon},
  { type:'Psich', active: false, imageUrl: energy_psich},
  { type:'Dark', active: false, imageUrl: energy_dark},
  { type:'Metal', active: false, imageUrl: energy_metal},
  { type:'Fight', active: false, imageUrl: energy_fight},
  { type:'Eletric', active: false, imageUrl: energy_eletric},
  { type:'Colorless', active: false, imageUrl: energy_colorless},
];

const PlayerCard = ({ name, lastVictoryDate, imageUrl, statuses }) => {
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
          <Avatar src={imageUrl} style={{ width: '50px', height: '50px' }} />
          <Typography variant="subtitle1" just>{name}</Typography>
          <Typography variant="caption">{lastVictoryDate}</Typography>
          <Grid container spacing={1} justifyContent="center" style={{ marginTop: '10px' }}>
            {badges.map((badge, index) => (
              <Grid item key={index} xs={2}>
                <img
                  src={statuses[index] ? badge.imageUrl : energy_gray}
                  alt={`Energy ${badge.type}`}
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