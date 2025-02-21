import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { green, red, yellow } from '@material-ui/core/colors';

const PieChartResults = ({ vitorias, derrotas, empates }) => {
  const total = vitorias + derrotas + empates;

  // Calcular porcentagens
  const data = [
    { name: 'Vitórias', value: vitorias },
    { name: 'Derrotas', value: derrotas },
    { name: 'Empates', value: empates },
  ];

  const COLORS = [green[500], red[500], yellow[700]];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ name, value }) => `${name}: ${(value / total * 100).toFixed(1)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartResults;
