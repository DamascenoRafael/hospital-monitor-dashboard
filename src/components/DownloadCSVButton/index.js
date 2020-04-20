import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

import { AiOutlineCloudDownload } from 'react-icons/ai';
import './styles.css';

const DownloadCSVButton = ({ reports, filename, title }) => {
  const headers = [
    { label: 'Data', key: 'timestamp' },
    { label: 'Frequência Cardíaca (bpm)', key: 'beat' },
    { label: 'SpO2 (%)', key: 'spo2' },
    { label: 'Temperatura (°C)', key: 'temp' },
  ];

  const data = reports.map((record) => {
    let newRecord = { ...record };
    newRecord.timestamp = new Date(record.timestamp).toLocaleString('pt-BR');
    return { ...newRecord };
  });

  return (
    <CSVLink data={data} headers={headers} separator=";" filename={filename} target="_blank">
      <AiOutlineCloudDownload className="download-button" size={32} title={title} />
    </CSVLink>
  );
};

export default DownloadCSVButton;
