import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { format } from 'date-fns';

const CalendarPage = ({ entries }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getMoodColor = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const entry = entries?.find((entry) => entry.entry_date === formattedDate);
    return entry ? entry.mood_color : '#f0f0f0'; // Default to a neutral color if no entry exists
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: 'center', color: '#3f51b5', marginBottom: 4 }}
        >
          Your Personal Calendar
        </Typography>
        
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderDay={(day, _value, DayComponentProps) => {
              const moodColor = getMoodColor(day);
              return (
                <Box
                  sx={{
                    backgroundColor: moodColor,
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    margin: 'auto',
                  }}
                >
                  <DayComponentProps.Day />
                </Box>
              );
            }}
            sx={{
              width: '100%', // Take up the full width of the container
              maxWidth: '100%', // Ensure it stretches completely
              height: '100%', // Ensures it takes up the entire height of the container
            }}
          />
        
      
    </LocalizationProvider>
  );
};

export default CalendarPage;
