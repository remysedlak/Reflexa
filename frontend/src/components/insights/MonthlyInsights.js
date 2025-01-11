import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

const MonthlyInsights = () => {
  const [insights, setInsights] = useState(null);
  const [moodColors, setMoodColors] = useState({});

  useEffect(() => {
    const fetchMoodColors = async () => {
      try {
        const response = await axios.get('http://3.147.75.57:8000/api/mood-colors/');
        const moodColorsData = response.data.mood_colors.reduce((acc, mood) => {
          acc[mood.value] = mood.label;
          return acc;
        }, {});
        setMoodColors(moodColorsData);
      } catch (error) {
        console.error('Error fetching mood colors:', error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.147.75.57:8000/api/past-thirty-days/');
        setInsights(response.data);
      } catch (error) {
        console.error('Error fetching insights:', error);
      }
    };

    fetchMoodColors();
    fetchData();
  }, []);

  const pieData = insights
    ? Object.entries(insights.mood_color_percentages).map(([color, percentage]) => ({
        id: color,
        label: moodColors[color] || color,
        value: percentage,
      }))
    : [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Last 30 Days Insights
      </Typography>
      {insights && (
        <Box sx={{ height: 400, width: '100%', maxWidth: 800 }}>
          <PieChart
            series={[
              {
                data: pieData,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            height={200}
          />
          <Typography>Average Sleep: {insights.average_sleep.toFixed(2)} hours</Typography>
          <Typography>Average Hydration: {insights.average_hydration.toFixed(2)} liters</Typography>
          <Typography>Average Exercise: {insights.average_exercise.toFixed(2)} minutes</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MonthlyInsights;