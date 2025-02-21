import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Box,
} from '@material-ui/core';
import { blue, green, red, yellow } from '@material-ui/core/colors';
import PieChartResults from '../components/PieChartResults';

const PlayerHistory = () => {
  const [pokeId, setPokeId] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const url = 'https://atwiiister.meudesk.top/liga/playerHistory/';
 //const url = 'http://localhost:5010/liga/playerHistory/';
  const handleSearch = async () => {
    if (!pokeId) {
      setError('Por favor, insira um PokeID');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(url + pokeId);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }

      const data = await response.json();
      setPlayerData(data);
    } catch (err) {
      setError('Erro ao buscar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      {/* Título como Banner */}
      <Box
        textAlign="center"
        py={4}
        mb={4}
        style={{
          background: 'linear-gradient(to right, #1976d2, #1565c0)',
          color: 'white',
          borderRadius: '0px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        <Typography variant="h3" component="h1" style={{ fontWeight: 'bold' }}>
          Histórico do Jogador
        </Typography>
      </Box>

      {/* Input e Botão de Buscar */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mb={4}
        gap={2}
        style={{
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        <TextField
          type="number"
          value={pokeId}
          onChange={(e) => setPokeId(e.target.value)}
          label="Digite o PokeID"
          variant="outlined"
          fullWidth
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
          size="large"
          style={{
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            marginTop: '10px',
            width: '100%',
          }}
        >
          Buscar
        </Button>
      </Box>

      {/* Mensagens de Loading e Erro */}
      {loading && (
        <Box textAlign="center" mb={4}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box mb={4}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}


      {/* Exibição dos Dados */}
{playerData && (
  <Card elevation={3}>
    <CardContent>
      <Typography variant="h4" component="h2" color="primary" gutterBottom>
        {playerData.playerNome}
      </Typography>
      


{playerData && (
  <Card elevation={3} style={{ marginTop: '20px' }}>
      {/* Gráfico de Pizza */}
      <Box mt={4}>
        <PieChartResults
          vitorias={playerData.totalVitorias}
          derrotas={playerData.totalDerrotas}
          empates={playerData.totalEmpates}
        />
      </Box>
  </Card>
)}

      <Box component="ul" style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span
            style={{
              height: '12px',
              width: '12px',
              borderRadius: '50%',
              backgroundColor: blue[500],
              display: 'inline-block',
              marginRight: '8px',
            }}
          ></span>
          <Typography variant="body1" color="textSecondary">
            Total de Partidas: {playerData.totalPartidas}
          </Typography>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span
            style={{
              height: '12px',
              width: '12px',
              borderRadius: '50%',
              backgroundColor: green[500],
              display: 'inline-block',
              marginRight: '8px',
            }}
          ></span>
          <Typography variant="body1" color="textSecondary">
            Total de Vitórias: {playerData.totalVitorias}
          </Typography>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span
            style={{
              height: '12px',
              width: '12px',
              borderRadius: '50%',
              backgroundColor: red[500],
              display: 'inline-block',
              marginRight: '8px',
            }}
          ></span>
          <Typography variant="body1" color="textSecondary">
            Total de Derrotas: {playerData.totalDerrotas}
          </Typography>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span
            style={{
              height: '12px',
              width: '12px',
              borderRadius: '50%',
              backgroundColor: yellow[700],
              display: 'inline-block',
              marginRight: '8px',
            }}
          ></span>
          <Typography variant="body1" color="textSecondary">
            Total de Empates: {playerData.totalEmpates}
          </Typography>
        </li>

        {/* Lista de jogadores que mais perderam */}
        <li>
          <Typography variant="body1" color="textSecondary" style={{ fontWeight: 'bold' }}>
            Jogadores que mais perderam de você:
          </Typography>
          {Array.isArray(playerData.playersMaisPerderamNomes) &&
            playerData.playersMaisPerderamNomes.map((nome, index) => (
              <Typography key={index} variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                - {nome}
              </Typography>
            ))}
          <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px', fontStyle: 'italic' }}>
            Total de Derrotas para esses jogadores: {playerData.totalDerrotasParaEssesPlayers}
          </Typography>
        </li>

        {/* Lista de jogadores que mais ganharam */}
        <li>
          <Typography variant="body1" color="textSecondary" style={{ fontWeight: 'bold' }}>
            Jogadores que mais ganharam de você:
          </Typography>
          {Array.isArray(playerData.playersMaisGanharamNomes) &&
            playerData.playersMaisGanharamNomes.map((nome, index) => (
              <Typography key={index} variant="body2" color="textSecondary" style={{ marginLeft: '16px' }}>
                - {nome}
              </Typography>
            ))}
          <Typography variant="body2" color="textSecondary" style={{ marginLeft: '16px', fontStyle: 'italic' }}>
            Total de Vitórias desses jogadores: {playerData.totalVitoriasDessePlayers}
          </Typography>
        </li>
      </Box>
    </CardContent>
  </Card>
)}

    </Container>
  );
};

export default PlayerHistory;
