import React from 'react';
import WeeklyInsights from '../components/insights/WeeklyInsights';
import MonthlyInsights from '../components/insights/MonthlyInsights';
import { Box } from '@mui/material';

const Insights = ({ details }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
    <Box sx={{ flex: 1, mr: 2 }}>
      <WeeklyInsights entries={details} />
    </Box>
    <Box sx={{ flex: 1, ml: 2 }}>
      <MonthlyInsights />
    </Box>
  </Box>
);

export default Insights;