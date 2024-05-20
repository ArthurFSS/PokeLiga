import React, { useState, useEffect } from "react";
import CardLiga from "../components/CardLiga";

const Home = () => {
    const [ligas, setLigas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const urlBase = "https://poke-liga-backend.vercel.app/ligas";
  
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
      return <div>Loading...</div>;
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
            tipo={liga.tipo}
            dataInicio={new Date(liga.datainicio).toLocaleDateString()}
            dataFim={new Date(liga.datafim).toLocaleDateString()}
            status={liga.finalizada ? 'Finalizada' : 'Em andamento'}
            id={liga.id}
          />
        ))}
      </div>
    );
};

export default Home;