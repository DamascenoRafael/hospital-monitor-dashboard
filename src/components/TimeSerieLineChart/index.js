import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const TimeSerieLineChart = ({
  data,
  dataKeyX,
  dataKeyY,
  syncId,
  fillColor,
  unit,
  lineName,
  timeFormatter,
  valueFormatter,
  fixedDomain,
  fixedTicks,
  tickStep,
  tickOffset,
}) => {
  const calculateTicks = (step = 5, offset = 10) => {
    const allData = data.map((record) => parseInt(record[dataKeyY]));
    const dataMin = Math.min(...allData);
    const dataMax = Math.max(...allData);
    const start = Math.floor(dataMin / step) * step - offset;
    const end = Math.floor(dataMax / step) * step + offset;
    let ticks = [];
    for (let index = start; index <= end; index += step) {
      ticks.push(index);
    }
    return ticks;
  };

  const defaultTimeFormatter = (timestamp) => {
    var a = new Date(timestamp);
    var hour = a.getHours();
    var min = '0' + a.getMinutes();
    var sec = '0' + a.getSeconds();
    var time = hour + ':' + min.substr(-2) + ':' + sec.substr(-2);
    return time;
  };

  const timeLabelFormatter = (value) => {
    return timeFormatter ? timeFormatter(value) : defaultTimeFormatter(value);
  };

  const valueLabelFormatter = (value) => {
    return valueFormatter ? valueFormatter(value) : value;
  };

  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart data={data} syncId={syncId} margin={{ top: 8, right: 25, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis hide dataKey={dataKeyX} interval={0} tickFormatter={(timeStr) => timeLabelFormatter(timeStr)} />
        <YAxis
          type="number"
          interval={0}
          domain={fixedDomain || [(dataMin) => dataMin, (dataMax) => dataMax]}
          axisLine={false}
          unit={unit}
          ticks={fixedTicks || calculateTicks(tickStep, tickOffset)}
          tickFormatter={(value) => valueLabelFormatter(value)}
        />
        <Tooltip labelFormatter={(timeStr) => timeLabelFormatter(timeStr)} />
        <Line
          name={lineName}
          type="monotone"
          dataKey={dataKeyY}
          stroke={fillColor}
          fill={fillColor}
          dot={false}
          isAnimationActive={false}
          unit={unit}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSerieLineChart;