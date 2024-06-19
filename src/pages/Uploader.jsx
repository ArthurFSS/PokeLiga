import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core';
import LoadingSpinner from "../components/LoadingSpinner";


const decksGLC = [
    {id: 1, tipo: 'Agua'},
    {id: 2, tipo: 'Fogo'},
    {id: 3, tipo: 'Planta'},
    {id: 4, tipo: 'Eletrico'},
    {id: 5, tipo: 'Psiquico'},
    {id: 6, tipo: 'Lutador'},
    {id: 7, tipo: 'Noturno'},
    {id: 8, tipo: 'Metal'},
    {id: 9, tipo: 'Dragao'},
    {id: 10, tipo: 'Normal'}
]

//const url = 'http://localhost:5010/';
const url = 'https://app.noida.tech/';

const convertDateToISO = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const date = new Date(year, month - 1, day); // Mês é zero-indexado no JavaScript
    return date.toISOString(); // Converte para o formato ISO 8601
  };

function formatPlayers(playersData) {
    return playersData.map(player => {
        return {
            idPokemon: player['@attributes'].userid,
            firstName: player.firstname['#text'],
            lastName: player.lastname['#text'],
            birthdate: convertDateToISO(player.birthdate['#text'])
        };
    });
}

function formatStandings(inputJson, data, liga) {
    // Verifica se inputJson e inputJson.pod existem e são arrays  
    if (!inputJson || !Array.isArray(inputJson.pod)) {
        throw new TypeError("inputJson.pod is not an array");
    }

    // Inicializa um array vazio para armazenar os jogadores no novo formato
    const transformedPlayers = [];

    // Percorre cada item do array "pod" no JSON de entrada
    inputJson.pod.forEach(podItem => {
        const category = podItem['@attributes'].category;

        // Verifica se podItem.player existe e é um array
        if (Array.isArray(podItem.player)) {
            // Percorre cada jogador no array "player" do pod atual
            podItem.player.forEach(player => {
                const id = player['@attributes'].id;
                const place = player['@attributes'].place;

                // Cria um novo objeto com os dados transformados
                const transformedPlayer = {
                    idPokemon: id,
                    place: place,
                    categoria: Number(category),
                    data: data,
                    idLiga: liga
                };

                // Adiciona o novo objeto ao array de jogadores transformados
                transformedPlayers.push(transformedPlayer);
            });
        }
    });
    return  transformedPlayers;
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
                idLiga: liga
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
    const [standings, setStandings] = useState([]);
    const [deckSelecionado, setDeckSelecionado] = useState({id: 0, tipo: ''});

    useEffect(() => {
        const fetchLigas = async () => {
            try {
                const response = await axios.get(url + 'liga/ativas'); // Atualize a URL conforme necessário
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
          const response = await axios.post(url + 'import/players', players);
          setLoadingPlayers(false);
      } catch (error) {
          console.error('Erro ao enviar os dados para a API:', error);
      }
  }

    async function processarPartidas(data, liga, badge) {
        try {
          const response = await axios.get( url + `processar-liga/${data}/${liga}/${badge.id}`);     
        } catch (error) { 
          console.error('Erro ao processar as partidas:', error);
        }
    }
  
  async function sendMatchesToAPI(matches) {
    try {
          setLoadingMatches(true);
          const response = await axios.post(url + 'import/partidas', matches);
          setLoadingMatches(false);
      } catch (error) {
          console.error('Erro ao enviar os dados para a API:', error);
      }
  }

  async function sendStandinsToAPI(standins) {
    try {
        setLoadingMatches(true);
        const response = await axios.post(url + 'import/standins', standins);
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

    const handleDeckChange = (event) => {
        const id = event.target.value;
        const deck = decksGLC.find(deck => deck.id === id);
        setDeckSelecionado(deck);
    };
    

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const xmlString = e.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");

            const jsonData = xmlToJson(xmlDoc);
            const dataEvento = new Date(jsonData.tournament.data.startdate['#text']).toISOString().split('T')[0]
            setDataAtual(dataEvento);

            const players = formatPlayers(jsonData.tournament.players.player);
            const matches = transformarDados(jsonData.tournament.pods.pod, ligaSelecionada.id);
            const standings = formatStandings(jsonData.tournament.standings, dataEvento, ligaSelecionada.id);

            setPlayers(players);
            setMatches(matches);
            setStandings(standings);
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
        await sendStandinsToAPI(standings);
    };

    if (loadingPlayers || loadingMatches) {
      return (<div>
        <LoadingSpinner/>
        <Typography>Enviando dados para api. Isso pode levar um tempo...</Typography>
        </div>
      );
    }
const sendRules = () => {  
    if(ligaSelecionada.tipo === 'GLC' && deckSelecionado.id === 0){
        return false;
    }
    if(ligaSelecionada){
        return false;
    }
    return true;
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
            <FormControl fullWidth disabled={!(ligaSelecionada.tipo === 'GLC')}> 
            <InputLabel id="deck-label">Deck Vencedor</InputLabel>
                <Select
                  labelId="liga-label"
                   id="liga"
                  value={deckSelecionado && deckSelecionado.id ? deckSelecionado.id : ''}
                  onChange={handleDeckChange}
                >
                    <MenuItem value="">
                        <em>Selecione o deck vencedor</em>
                    </MenuItem>
                    {decksGLC.map(deck => (
                        <MenuItem key={deck.id} value={deck.id}>{deck.tipo}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {ligaSelecionada && (
                <div>
                    <Typography>Tipo: {ligaSelecionada.tipo}</Typography>
                    <Typography>Data Início: {new Date(ligaSelecionada.dataInicio).toLocaleDateString('pt-BR')}</Typography>
                    <Typography>Data Fim: {new Date(ligaSelecionada.dataFim).toLocaleDateString('pt-BR')}</Typography>
                </div>
            )}
            <input type="file" onChange={handleFileUpload} />
            <button type="submit" disabled={sendRules()}>Enviar</button>
        </form>
    );
};

export default Uploader;
