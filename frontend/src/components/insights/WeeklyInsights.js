import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import the configured axios instance
import { Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const WeeklyInsights = () => {
  const [averageSleep, setAverageSleep] = useState(null);
  const [mostCommonMood, setMostCommonMood] = useState(null);
  const [averageExercise, setAverageExercise] = useState(null);
  const [averageHydration, setAverageHydration] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.147.75.57:8000/api/aggregated-data/');
        const data = response.data;

        setAverageSleep(data.average_sleep);
        setMostCommonMood(data.most_common_mood);
        setAverageExercise(data.average_exercise);
        setAverageHydration(data.average_hydration);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 , overflowY: 'auto', maxheight: '80vh'}}>
    <div className="weekly-insights">
      <Typography variant="h4" gutterBottom>
              Last 7 Days Insights
            </Typography>

  
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={500}
      height={300}
    />



      {averageSleep !== null && <p>Average Sleep: {averageSleep.toFixed(2)} hours</p>}
      
      {averageExercise !== null && <p>Average Exercise: {averageExercise.toFixed(2)} minutes</p>}
      {averageHydration !== null && <p>Average Hydration: {averageHydration.toFixed(2)} liters</p>}
    </div>
    </Box>
  );
};

export default WeeklyInsights;