import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EntryTable = () => {
  const [daysData, setDaysData] = useState([]);

  // Fetch data from the Django REST API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.147.75.57:8000/api/days/'); // Ensure this endpoint is correct
        const data = await response.json();

        // Sort entries by date (latest first)
        const sortedData = data.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));

        // Limit to the 5 most recent entries
        const recentEntries = sortedData.slice(0, 5); // Change 5 to 3 for fewer entries

        setDaysData(recentEntries);
      } catch (error) {
        console.error('Error fetching days data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Mood</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {daysData.map((day) => (
            <TableRow key={day.id}>
              <TableCell>{new Date(day.entry_date).toLocaleDateString()}</TableCell>
              <TableCell>{day.entry_content}</TableCell>
              <TableCell>{day.mood_color}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EntryTable;