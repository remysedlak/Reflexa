// src/pages/CalendarPage.js
import React from 'react';
import CalendarTile from '../components/CalendarTile'; // Adjust the import if needed
import { Typography } from '@mui/material'; // Optional for consistent styling

const Calendar = ({ entries }) => (
  <div className="calendar-page">
    {/* Optional: Use Typography for consistent header styling */}
    <Typography
      variant="h4"
      component="h1"
      sx={{
        textAlign: 'center',  // Center the title
        marginBottom: '20px', // Add margin below the title
      }}
    >
      Calendar
    </Typography>

    {/* Wrap the CalendarTile component in a container */}
    <div className="calendar-container">
      <CalendarTile entries={entries} />
    </div>
  </div>
);

export default Calendar;
