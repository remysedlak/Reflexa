import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography } from '@mui/material';
import TrashButton from '../components/buttons/TrashButton';
import '../styles/Home.css'; // Import a CSS file for styling
import EditButton from '../components/buttons/EditButton';

const Journal = ({ details }) => {
  const [groupedEntries, setGroupedEntries] = useState({});

  useEffect(() => {
    if (details) {
      // Group entries by month and year
      const grouped = details.reduce((acc, entry) => {
        const date = new Date(entry.entry_date);
        const month = date.toLocaleString('default', { month: 'long' }); // e.g., "January"
        const year = date.getFullYear(); // e.g., 2025
        const key = `${month} ${year}`; // e.g., "January 2025"

        if (!acc[key]) acc[key] = [];
        acc[key].push(entry);

        return acc;
      }, {});

      setGroupedEntries(grouped);
    }
  }, [details]);

  // Function to handle delete (you can customize this as per your API call)
  const handleDelete = (entryId) => {
    fetch(`/api/journal/${entryId}/`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log(data.message);  // Success
          setGroupedEntries(prevGroupedEntries => {
            // Remove the deleted entry from the state
            const newGroupedEntries = { ...prevGroupedEntries };
            for (const month in newGroupedEntries) {
              newGroupedEntries[month] = newGroupedEntries[month].filter(entry => entry.id !== entryId);
            }
            return newGroupedEntries;
          });
        } else {
          console.error(data.error);  // Error handling
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="journalpage">
      <Typography
        sx={{
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        Journal Entries
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entry Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedEntries).length > 0 ? (
              Object.keys(groupedEntries).map((month) => (
                groupedEntries[month].map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.entry_title}</TableCell>
                    <TableCell>{new Date(entry.entry_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</TableCell>
                    <TableCell>{entry.content}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDelete(entry.id)}
                        color="secondary"
                        aria-label="delete"
                      >
                        <TrashButton /> {/* Use your TrashButton component here */}
                        <EditButton/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Loading entries...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Journal;
