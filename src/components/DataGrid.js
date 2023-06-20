import React, {useState,useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';

function DataGridForCountry() {
    const [data,setData] = useState([]);
    const [error,setError] = useState(null);

    const getCountry = async () => {
      try {
        await axios.get("https://restcountries.com/v3.1/all").then(async res => {
            setData(res.data);
        });
      } catch (error){
        setError(error.message);
      }
        
    };

    useEffect(() => {
        getCountry();
    },[]);

    const columns = [
        { field: "id", headerName: "Id", width: 100 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "region", headerName: "Region", width: 200 },
        { field: "capital", headerName: "Capital", width: 200 },
        { field: "population", headerName: "Population", width: 200 },
        {
          field: "flags",
          headerName: "Flag",
          width: 120,
          renderCell: (params) => {
            console.log(params.value);
            return <img 
            src={params.value} 
            alt="Flag" 
            style={{ width: '100%', height: 'auto' }} />
          },
        },
      ];

      if(error){
        return <div> Error: {error}</div>;
      }

      const rows = data.map((row, index) => ({
        id: index+1,
        name: row.name.common,
        region: row.region,
        capital: row.capital,
        population: row.population,
        flags: row.flags.svg,
      }))

    console.log(data)

    return <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
        />
    </div>
}

export default DataGridForCountry;