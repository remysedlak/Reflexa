import React, { useState, useEffect } from 'react';

const WeeklyInsights = ({ entries }) => {
  const [averageSleep, setAverageSleep] = useState(null);

  useEffect(() => {
    // Function to calculate the average sleep in the past 7 days
    const calculateAverageSleep = () => {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7); // Get the date 7 days ago

      // Filter entries to only include those from the past 7 days
      const recentEntries = entries.filter(entry => {
        const entryDate = new Date(entry.entry_date);
        return entryDate >= sevenDaysAgo && entryDate <= today;
      });

      // Calculate the total sleep hours in the filtered entries
      const totalSleep = recentEntries.reduce((sum, entry) => sum + (entry.hours_of_sleep || 0), 0);

      // Calculate the average sleep
      const average = recentEntries.length > 0 ? totalSleep / recentEntries.length : 0;

      // Set the average sleep in state
      setAverageSleep(average);
    };

    // Calculate the average sleep on component mount
    calculateAverageSleep();
  }, [entries]); // Recalculate if the entries change

  return (
    <div className="weekly-insights">
      <h3>Weekly Insights</h3>
      {averageSleep !== null ? (
        <p>Average Sleep in the Last 7 Days: {averageSleep.toFixed(2)} hours</p>
      ) : (
        <p>Loading insights...</p>
      )}
    </div>
  );
};

export default WeeklyInsights;
