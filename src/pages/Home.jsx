import React, { useState, useEffect } from "react";
import CardLiga from "../components/CardLiga";
import LoadingSpinner from "../components/LoadingSpinner";
import { Height } from "@material-ui/icons";


const Home = () => {
    const [ligas, setLigas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    //const url = 'http://localhost:5010/';
    const url = 'https://atwiiister.meudesk.top/';
    const urlBase = url + "liga";
  
    useEffect(() => {
      fetch(urlBase)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setLigas(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <LoadingSpinner/>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!ligas || ligas.length === 0) {
      return <div>No data available</div>;
    }
  
    return (
      <div>
        {ligas.map(liga => (
          <CardLiga
            key={liga.id}
            organizador={liga.organizador}
            descricao={liga.descricao}
            tipo={liga.tipoNome}
            dataInicio={new Date(liga.dataInicio).toLocaleDateString()}
            dataFim={new Date(liga.dataFim).toLocaleDateString()}
            status={liga.finalizada ? 'Finalizada' : 'Em andamento'}
            id={liga.id}
          />
        ))}
      </div>
    );
};

export default Home;