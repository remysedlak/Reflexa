import React from 'react';
import '../styles/Home.css'; // Import a CSS file for styling
import EntryTable from '../components/EntryTable.js';
import CalendarTile from '../components/CalendarTile';
import { Typography } from '@mui/material';

const Home = ({ details }) => (
  <div className="homepage">
    
    {/* Main Content (Left and Right Panels) */}
    <div className="main-content">
      {/* Left Panel: Recent Journal Entries */}
      <div className="left-panel">
        <Typography
          sx={{
            marginBottom: '20px',
            fontWeight: 'bold',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
          }}
        >
          Recent Journal Entries
        </Typography>
        <EntryTable entries={details} />
      </div>

      {/* Right Panel: Calendar */}
      <div className="right-panel">
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            marginBottom: '10px',
          }}
        >
          A Look At This Month
        </Typography>
        <CalendarTile entries={details} />
      </div>
    </div>
  </div>
);

export default Home;
