import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PremiacaoCard from '../components/PremiacaoCard';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tabPanel: {
    padding: '0px',
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.posicao}
        </TableCell>
        <TableCell align="left">{row.nome}</TableCell>
        <TableCell align="right">{row.pontos}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Histórico
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>#</TableCell>
                    <TableCell>Res</TableCell>
                    <TableCell align="right">Pontos</TableCell>
                  </TableRow>
                </TableHead>
                 <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.data}>
                      <TableCell component="th" scope="row">
                        {new Date(historyRow.data).toLocaleDateString()}
                      </TableCell>
                      <TableCell component="th" align="center" scope="row">
                        {historyRow.place}
                      </TableCell>
                      <TableCell component="th" align="center" scope="row">
                        {historyRow.vitorias + "/" + historyRow.derrotas + "/" + historyRow.empates}
                      </TableCell>
                      <TableCell align="right">{historyRow.pontos}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> 
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function RowTournament(props) {
  const { rowsStandins } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {new Date(rowsStandins.data).toLocaleDateString('pt-BR', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
})}
        </TableCell>
        <TableCell align="center">{rowsStandins.participantes}</TableCell>
        <TableCell align="center">{rowsStandins.categoria}</TableCell>
        {/* <TableCell align="right">{rowsStandins.vencedor}</TableCell> */}
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="Left">#</TableCell>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Res.</TableCell>
                    <TableCell align="right">Pontos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsStandins.standins.map((historyRow) => (
                    <TableRow key={historyRow.data}>
                      <TableCell align="Left"  >
                        {historyRow.place}
                      </TableCell>
                      <TableCell align="center">{historyRow.nome}</TableCell>
                      <TableCell align="center">{historyRow.vitorias + "/" + historyRow.derrotas + "/" + historyRow.empates}</TableCell>
                      <TableCell align="right">{historyRow.pontos}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Ligas() {
  const [rows, setData] = useState(null);
  const [premiacao, setPremiacao] = useState(null);
  const [rowsStandins, setStandins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState('0');
  const { id } = useParams();

useRowStyles
  //const url = 'http://localhost:5010/';
  const url = 'https://atwiiister.meudesk.top/';
  const urlBase =  url + "liga/" + id;
  const classes = useRowStyles();
  const urlStandins = url + "liga/standins/" + id;
  const urlPremiacao = url + "liga/caixa/" + id;

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const [baseResponse, standinsResponse, premiacaoResponse] = await Promise.all([
                fetch(urlBase),
                fetch(urlStandins),
                fetch(urlPremiacao)
            ]);

            if (!baseResponse.ok) {
                throw new Error('Network response was not ok for base data');
            }

            if (!standinsResponse.ok) {
                throw new Error('Network response was not ok for standins data');
            }

            const [baseData, standinsData, premiacaoResp] = await Promise.all([
                baseResponse.json(),
                standinsResponse.json(),
                premiacaoResponse.json(),
            ]);

            setData(baseData);
            setStandins(standinsData);
            setPremiacao(premiacaoResp)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [id]);


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!rows) {
    return <div>No data available</div>;
  }

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <PremiacaoCard value={premiacao}/>
      <TabContext value={tabIndex}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="full width tabs">
            <Tab label="Ranking" value="0" />
            <Tab label="Ultimos Torneios" value="1" />
          </TabList>
        </AppBar>
        <TabPanel className={classes.tabPanel} value="0">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Posição</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="right">Pontos</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.posicao} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="1">
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell align="center">Quantidade</TableCell>
                  <TableCell align="center">Categoria</TableCell>
                  {/* <TableCell align="right">Vencedor</TableCell> */}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsStandins.map((rowsStandins) => (
                  <RowTournament key={rowsStandins.data} rowsStandins={rowsStandins} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
    </div>
  );
}
