import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

const GenericBarChart = ({ data, dataKeyX, dataKeyY, syncId, fillColor, unit, barName, labelColor }) => {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart syncId={syncId} data={data} margin={{ left: 25, right: 25 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} />
        <YAxis unit={unit} />
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="top" align="center" />
        <Bar
          name={barName}
          unit={unit}
          dataKey={dataKeyY}
          fill={fillColor}
          label={{
            formatter: (str) => str + unit,
            position: 'center',
            fill: labelColor || 'white',
            fontSize: '18px',
            fontWeight: 500,
          }}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GenericBarChart;
