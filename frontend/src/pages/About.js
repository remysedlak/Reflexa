// src/pages/About.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <Box sx={{ p: 3 , overflowY: 'auto', maxHeight: '80vh'}}>
            <Typography variant="h4" gutterBottom>
              About Reflexa
            </Typography>
            <Typography variant="body1" gutterBottom>
              Reflexa is a full-stack web application that allows users to track their daily activities, such as sleep, mood, exercise, and hydration. The application provides insights on the user's weekly and monthly activities.
          </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default About;
