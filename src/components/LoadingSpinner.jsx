import React from 'react';
import pokebola from '../assets/pokeball.gif';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
loading: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: '100%', 
  height: 'auto',
},
});

function LoadingSpinner() {
  const classes = useStyles();

  return (
    <div>
      <img src={pokebola} alt="Loading..." className={classes.loading}/>
    </div>
  );
}

export default LoadingSpinner;