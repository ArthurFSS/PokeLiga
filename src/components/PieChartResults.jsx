import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
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

  // Função para renderizar o label centralizado
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(1)}%
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          label={renderCustomizedLabel}
          stroke="#000"         // Cor das bordas (preto)
          strokeWidth={2}       // Espessura das bordas
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} (${(value / total * 100).toFixed(1)}%)`, name]} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartResults;
