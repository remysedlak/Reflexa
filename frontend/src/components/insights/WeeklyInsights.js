import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import the configured axios instance
import { Typography } from '@mui/material';

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
    <div className="weekly-insights">
      <Typography
        sx={{
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
        }}
      >
        Your Weekly Insights
      </Typography>
      {averageSleep !== null && <p>Average Sleep: {averageSleep.toFixed(2)} hours</p>}
      {mostCommonMood && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>Average Mood:</p>
          <span
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '100%',
              backgroundColor: mostCommonMood.color,
              margin: '0 10px',
            }}
          ></span>
          <p>{mostCommonMood.mood}</p>
        </div>
      )}
      {averageExercise !== null && <p>Average Exercise: {averageExercise.toFixed(2)} minutes</p>}
      {averageHydration !== null && <p>Average Hydration: {averageHydration.toFixed(2)} liters</p>}
    </div>
  );
};

export default WeeklyInsights;