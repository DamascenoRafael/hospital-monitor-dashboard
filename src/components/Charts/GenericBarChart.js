import React, { useState, useEffect } from 'react';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

const GenericBarChart = ({ data, dataKeyX, dataKeyY, syncId, fillColor, unit, barName }) => {

  const CustomBarLabel = ({ x, y, value, barWidth }) => {
    return (
      <text x={x + barWidth / 2} y={y} fill="#777" dy={-6} textAnchor="middle">
        {value}
      </text>
    )
  }



  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        syncId={syncId}
        data={data}
        margin={{ left: 25, right: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} />
        <YAxis unit={unit} />
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="top" align="center" />
        <Bar name={barName} unit={unit} dataKey={dataKeyY} fill={fillColor} label={{ position: 'top' }} />
      </BarChart>
    </ResponsiveContainer >
  )
}

export default GenericBarChart;