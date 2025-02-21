import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: '400px', // Limita o tamanho máximo para não estourar a tela
    margin: '5px auto',
    borderRadius: '0px',
    color: '#fff',
    overflow: 'hidden', // Impede que o conteúdo estoure o card
  },
  header: {
    backgroundColor: '#3f51b5', // Azul da parte superior
    color: '#fff',
    cursor: 'pointer',
    padding: '10px',
    textAlign: 'center',
  },
  collapseSection: {
    backgroundColor: '#f5f5f5',
    color: '#000',
    padding: '10px',
  },
  total: {
    fontWeight: 'bold',
  },
  primeiroLugar: {
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  segundoTerceiro: {
    fontSize: '1.2rem',
  },
  demaisColocacoes: {
    fontSize: '1rem',
  },
  colocacoes: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    textAlign: 'center', // Centraliza o texto em todas as telas
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr', // Uma coluna no mobile
      justifyItems: 'center', // Centraliza os itens no mobile
    },
  },
}));

const PremiacaoCard = ({ value }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const premiacao = value;

  if (!premiacao) {
    return null;
  }

  const formatarValor = (valor) =>
    Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Paper className={classes.container}>
      <Box className={classes.header} onClick={() => setOpen(!open)}>
        <Typography variant="h6" className={classes.total}>
          Premiação Total: {formatarValor(premiacao.total)}
          <IconButton size="small" style={{ color: '#fff' }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Typography>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.collapseSection}>
          <Typography variant="h6" className={classes.primeiroLugar}>
            1º Lugar: {formatarValor(premiacao.posicao1)}
          </Typography>
          <Box className={classes.colocacoes}>
            <Typography className={classes.segundoTerceiro}>
              2º Lugar: {formatarValor(premiacao.posicao2)}
            </Typography>
            <Typography className={classes.segundoTerceiro}>
              3º Lugar: {formatarValor(premiacao.posicao3)}
            </Typography>
            <Typography className={classes.demaisColocacoes}>
              4º Lugar: {formatarValor(premiacao.posicao4)}
            </Typography>
            <Typography className={classes.demaisColocacoes}>
              5º Lugar: {formatarValor(premiacao.posicao5)}
            </Typography>
            <Typography className={classes.demaisColocacoes}>
              6º Lugar: {formatarValor(premiacao.posicao6)}
            </Typography>
            <Typography className={classes.demaisColocacoes}>
              7º Lugar: {formatarValor(premiacao.posicao7)}
            </Typography>
            <Typography className={classes.demaisColocacoes}>
              8º Lugar: {formatarValor(premiacao.posicao8)}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default PremiacaoCard;
