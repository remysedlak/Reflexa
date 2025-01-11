import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios'; // Ensure this path is correct
import { Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import dayjs from 'dayjs';

const MonthlyInsights = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [insights, setInsights] = useState(null);

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const years = [2024, 2025]; // Add more years as needed

  useEffect(() => {
    const fetchLatestMonthYear = async () => {
      try {
        const response = await axios.get('days/');
        const data = response.data;

        // Find the most recent entry date
        const latestEntry = data.reduce((latest, entry) => {
          const entryDate = dayjs(entry.entry_date);
          return entryDate.isAfter(latest) ? entryDate : latest;
        }, dayjs(data[0].entry_date));

        setMonth(latestEntry.month() + 1); // dayjs months are 0-indexed
        setYear(latestEntry.year());
      } catch (error) {
        console.error('Error fetching latest month and year:', error);
      }
    };

    fetchLatestMonthYear();
  }, []);

  useEffect(() => {
    if (month && year) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`monthly-insights/${month}/${year}/`);
          setInsights(response.data);
        } catch (error) {
          console.error('Error fetching insights:', error);
        }
      };

      fetchData();
    }
  }, [month, year]);

  const pieData = insights
    ? Object.entries(insights.mood_color_percentages).map(([color, percentage]) => ({
        id: color,
        label: color,
        value: percentage,
      }))
    : [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Monthly Insights
      </Typography>
      <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
        <InputLabel>Month</InputLabel>
        <Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month">
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
        <InputLabel>Year</InputLabel>
        <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year">
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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