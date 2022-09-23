import logo from './logo.svg';
import './App.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Chip } from '@mui/material';
import { useEffect, useState } from 'react';

function PODs(params) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
    {params.formattedValue.map((e, i) => <div key={i} style={{ padding: 5, paddingBlock: 2 }}><Chip label={e} /></div>)}
  </div>
}

function Requests(params) {
  return params.formattedValue === null? '-': <div className="request-cell">
      <div>CPU: {params.formattedValue[0]}</div>
      <div>RAM: {params.formattedValue[1]}</div>
    </div>
}

function KDPAS(setRow) {

  return function (params) {
    return params.row.Request === null? '-': params.formattedValue? <Button onClick={() => setRow(params.row.id, !params.formattedValue)} variant="contained" color="error">Disable</Button>: <Button onClick={() => setRow(params.row.id, !params.formattedValue)} variant="contained" color="success">Enable</Button>
  }
}

function App() {

  const [rows, setRows] = useState([
    { id: 1, Deployment: 'hello', namespace: 'test', Replicas: 7, PODs: ['pod1', 'pod2', 'pod3', 'pod4', 'pod1', 'pod2', 'pod3', 'pod4'], Request: [14, 23], KDPAS: true }
  ])

  function setRow(id, KDPAS) {
    // you can post before next line
    setRows(prev => prev.map(e => e.id === id? {...e, KDPAS}: e))
  }

  const columns = [
    { field: 'Deployment', width: 150 },
    { field: 'namespace', width: 150 },
    { field: 'Replicas', width: 150 },
    { field: 'PODs', width: 350, renderCell: PODs },
    { field: 'Request', width: 150, filterable: false, renderCell: Requests },
    { field: 'KDPAS', width: 150, renderCell: KDPAS(setRow) }
  ]
  

  useEffect(() => {
    //fetch('http://....').then(res => res.json()).then(res => setRows(res))
  }, [])

  return (
    <div className="App" style={{ height: 700, marginTop: 50 }}>
      <h1>KDPAS</h1>
      <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
    </div>
  );
}

export default App;
