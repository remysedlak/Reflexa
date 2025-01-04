import React from 'react';
import '../styles/Home.css'; // Import a CSS file for styling
import EntryTable from '../components/EntryTable.js';
import CalendarTile from '../components/CalendarTile';
import WeeklyInsights from '../components/WeeklyInsights.js';
import {Typography } from '@mui/material';

const Home = ({ details }) => (
  <div className="homepage">
    {/* Left Panel: Recent Journal Entries */}
    <div className="left-panel">
      <Typography
        sx={{
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}
      >
        Recent Journal Entries
      </Typography>
      <EntryTable />
    </div>

    {/* Right Panel: Calendar and Weekly Insights */}
    <div className="right-panel">
      {/* Calendar Section */}
      <div className="calendar-section">
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            marginBottom: '10px',
          }}
        >
          This Month
        </Typography>
        <CalendarTile entries={details} />
      </div>

     
    </div>
  </div>
);

export default Home;
