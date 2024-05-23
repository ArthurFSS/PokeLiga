import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core';
import LoadingSpinner from "../components/LoadingSpinner";

function formatPlayers(playersData) {
    return playersData.map(player => {
        return {
            userid: player['@attributes'].userid,
            firstname: player.firstname['#text'],
            lastname: player.lastname['#text'],
            birthdate: player.birthdate['#text']
        };
    });
}

function transformarDados(dados, ligaSelecionada) {
    const partidas = [];

    dados.rounds.round.forEach((round) => {
        const roundNumber = parseInt(round['@attributes'].number, 10);
        const matches = round.matches.match;

        const matchesFiltrados = matches.filter(match => {
            const outcome = parseInt(match['@attributes'].outcome, 10);
            return outcome === 1 || outcome === 2 || outcome === 3;
        });

        matchesFiltrados.forEach((match) => {
            const outcome = parseInt(match['@attributes'].outcome, 10);
            const player1 = parseInt(match.player1['@attributes'].userid, 10);
            const player2 = parseInt(match.player2['@attributes'].userid, 10);
            const data = match.timestamp['#text'].split(' ')[0];
            const liga = ligaSelecionada;

            partidas.push({
                roundNumber: roundNumber,
                player1: player1,
                player2: player2,
                outcome: outcome,
                data: formatarData(data),
                liga: liga
            });
        });
    });

    return partidas;
}

function formatarData(data) {
    const [mes, dia, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
}

const Uploader = () => {
    const [ligas, setLigas] = useState([]);
    const [ligaSelecionada, setLigaSelecionada] = useState('');
    const [players, setPlayers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(false);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [dataAtual, setDataAtual] = useState('');

    useEffect(() => {
        const fetchLigas = async () => {
            try {
                const response = await axios.get('https://poke-liga-backend.vercel.app/ligas'); // Atualize a URL conforme necessário
                setLigas(response.data);
            } catch (error) {
                console.error('Erro ao buscar as ligas:', error);
            }
        };

        fetchLigas();
    }, []);

    async function sendPlayersToAPI(players) {
      try {
          setLoadingPlayers(true);
          const response = await axios.post('https://poke-liga-backend.vercel.app/players', players);
          console.log('Resposta da API:', response.data);
          setLoadingPlayers(false);
      } catch (error) {
          console.error('Erro ao enviar os dados para a API:', error);
      }
  }

    async function processarPartidas(data, liga) {
        try {
          const response = await axios.get(`https://poke-liga-backend.vercel.app/processar-liga/${data}/${liga}`);
          console.log('Resposta da API:', response.data);
        
        } catch (error) { 
          console.error('Erro ao processar as partidas:', error);
        }
    }
  
  async function sendMatchesToAPI(matches) {
      try {
          setLoadingMatches(true);
          const response = await axios.post('https://poke-liga-backend.vercel.app/partidas', matches);
          console.log('Resposta da API:', response.data);
          setLoadingMatches(false);
      } catch (error) {
          console.error('Erro ao enviar os dados para a API:', error);
      }
  }

    const handleChange = (event) => {
        const selectedLigaId = event.target.value;
        const selectedLiga = ligas.find(liga => liga.id === selectedLigaId);
        setLigaSelecionada(selectedLiga);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const xmlString = e.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");

            const jsonData = xmlToJson(xmlDoc);
            setDataAtual(new Date(jsonData.tournament.data.startdate['#text']).toISOString().split('T')[0]);
            const players = formatPlayers(jsonData.tournament.players.player);
            const matches = transformarDados(jsonData.tournament.pods.pod, ligaSelecionada.id);

            setPlayers(players);
            setMatches(matches);
        };
        reader.readAsText(file);
    };

    const xmlToJson = (xml) => {
        const json = {};

        if (xml.nodeType === 1) { 
            if (xml.attributes.length > 0) {
                json["@attributes"] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    json["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) {
            return xml.nodeValue.trim();
        }

        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const child = xml.childNodes.item(i);
                const nodeName = child.nodeName;
                const nodeValue = xmlToJson(child);

                if (typeof nodeValue === 'string' && nodeValue === '') continue;

                if (json[nodeName] === undefined) {
                    json[nodeName] = nodeValue;
                } else {
                    if (!Array.isArray(json[nodeName])) {
                        json[nodeName] = [json[nodeName]];
                    }
                    json[nodeName].push(nodeValue);
                }
            }
        }
        return json;
    };

    async function handleSubmit (event){
        event.preventDefault();

        await sendPlayersToAPI(players);
        await sendMatchesToAPI(matches);
        await processarPartidas(dataAtual, ligaSelecionada.id);
    };

    if (loadingPlayers || loadingMatches) {
      return (<div>
        <LoadingSpinner/>
        <Typography>Enviando dados para api. Isso pode levar um tempo...</Typography>
        </div>
      );
    }


    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <InputLabel id="liga-label">Liga</InputLabel>
                <Select
                  labelId="liga-label"
                   id="liga"
                  value={ligaSelecionada && ligaSelecionada.id ? ligaSelecionada.id : ''}
                  onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Selecione uma liga</em>
                    </MenuItem>
                    {ligas.map(liga => (
                        <MenuItem key={liga.id} value={liga.id}>{liga.descricao}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {ligaSelecionada && (
                <div>
                    <Typography>Tipo: {ligaSelecionada.tipo}</Typography>
                    <Typography>Data Início: {new Date(ligaSelecionada.datainicio).toLocaleDateString('pt-BR')}</Typography>
                    <Typography>Data Fim: {new Date(ligaSelecionada.datafim).toLocaleDateString('pt-BR')}</Typography>
                </div>
            )}
            <input type="file" onChange={handleFileUpload} />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default Uploader;
