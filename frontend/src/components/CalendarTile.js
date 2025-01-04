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
    const entry = entries.find((entry) => entry.date === date.toISOString().split('T')[0]);
    return entry ? (
      <div
        style={{
          backgroundColor: entry.mood_color,
          height: '100%',
          width: '100%',
          borderRadius: '50%',
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
