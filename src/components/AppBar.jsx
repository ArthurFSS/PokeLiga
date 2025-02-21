import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconePokeliga from '../assets/pokeliga.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginLeft: 15,
    flexGrow: 1,
  },
  inicio: {
    marginLeft: 15,
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
  },
  appBar: {
    height: 64,
    justifyContent: 'center',
  },
  logo: {
    marginTop: 5,
    width: 50,
    height: 'auto',
    verticalAlign: 'middle',
  },
}));

export default function ButtonAppBar({ user }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img src={IconePokeliga} alt="" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            PokeLiga
          </Typography>
          <Typography variant="h6">
            <Link to="/history" className={classes.inicio}>Histórico</Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/" className={classes.inicio}>Inicio</Link>
          </Typography>
          {/* {user ? (
            <Typography variant="h6">
              <Link to="/profile" className={classes.inicio}>Profile</Link>
            </Typography>
          ) : (
            <Typography variant="h6">
              <Link to="/login" className={classes.inicio}>Entrar</Link>
            </Typography>
          )} */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
