import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; // Import the configured axios instance
import { Typography } from '@mui/material';

const Journal = () => {
  const [daysData, setDaysData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the Django REST API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.147.75.57:8000/api/days/');
        const data = response.data;

        // Sort entries by date (latest first)
        const sortedData = data.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));

        setDaysData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'entry_date', headerName: 'Date', width: 150 },
    { field: 'entry_title', headerName: 'Title', width: 200 },
    { field: 'hours_of_sleep', headerName: 'Sleep Hours', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Typography
              sx={{
                marginBottom: '20px',
                marginTop: '20px',
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
            >
              Your Journal
            </Typography>
      {loading ? (
        <Typography>Loading entries...</Typography>
      ) : (
        <DataGrid
          rows={daysData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id} // Ensure each row has a unique ID
        />
      )}
    </div>
  );
};

export default Journal;