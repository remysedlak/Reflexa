// src/pages/CalendarPage.js
import React from 'react';
import CalendarTile from '../components/CalendarTile'; // Adjust the import if needed

const Calendar = ({ entries }) => (
  <div>
    <h1>Calendar</h1>
    <CalendarTile entries={entries} />
  </div>
);


export default Calendar;
