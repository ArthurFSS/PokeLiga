import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import  logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '10px',
  },
});

function CardLiga({ organizador, descricao, tipo, dataInicio, dataFim, status, id }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate("/liga/" + id);
  }

  return (
    <div className={classes.container}>
      <Button onClick={handleClick}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={logo} alt=""/>
          </IconButton>
            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
              {organizador}
            </Typography> */}
            <Typography variant="h5" component="h2">
              {descricao}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {tipo}
            </Typography>
            <Typography variant="body2" component="p">
              De {dataInicio} a {dataFim}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Status: {status}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">{status}</Button>
          </CardActions>
        </Card>
      </Button>
    </div>
  );
}

CardLiga.propTypes = {
  organizador: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  dataInicio: PropTypes.string.isRequired,
  dataFim: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default CardLiga;
