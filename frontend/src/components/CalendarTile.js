import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarTile = ({ entries }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle date change
  const onDateChange = (date) => {
    setSelectedDate(date); // Update selected date
  };

  // Function to render mood color for each day
  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0]; // Ensure date is formatted as YYYY-MM-DD
    const entry = entries.find((entry) => entry.entry_date === formattedDate); // Match entry by date
    return entry ? (
      <div
        style={{
          backgroundColor: entry.mood_color, // Use the mood color from the entry
          height: '20px',  // Constrain the circle size
          width: '20px',   // Constrain the circle size
          borderRadius: '50%',
          margin: 'auto',  // Center the circle in the tile
        }}
      />
    ) : null;
  };

  return (
    <div>
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileContent={tileContent} // Attach tileContent function
      />
    </div>
  );
};

export default CalendarTile;
