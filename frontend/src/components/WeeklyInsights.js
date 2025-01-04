import React, { useState, useEffect } from 'react';

const WeeklyInsights = ({ entries }) => {
  const [averageSleep, setAverageSleep] = useState(null);
  const [mostCommonMood, setMostCommonMood] = useState(null);
  const [averageExercise, setAverageExercise] = useState(null);
  const [averageHydration, setAverageHydration] = useState(null);

  useEffect(() => {
    if (!Array.isArray(entries) || entries.length === 0) {
      console.error("Invalid or empty entries data:", entries);
      return;
    }

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const recentEntries = entries.filter(entry => {
      const entryDate = new Date(entry.entry_date);
      return (
        entryDate instanceof Date &&
        !isNaN(entryDate) &&
        entryDate >= sevenDaysAgo &&
        entryDate <= today
      );
    });

    if (recentEntries.length === 0) {
      console.warn("No entries found for the past 7 days.");
      setAverageSleep(0);
      setMostCommonMood(null);
      setAverageExercise(0);
      setAverageHydration(0);
      return;
    }

    // Calculate average sleep
    const totalSleep = recentEntries.reduce((sum, entry) => sum + (entry.hours_of_sleep || 0), 0);
    setAverageSleep(totalSleep / recentEntries.length);

    // Calculate most common mood
    const moodScale = {
      '#008000': 'Good mood',
      '#FFD700': 'Happy',
      '#00BFFF': 'Neutral',
      '#FF6347': 'Sad',
      '#808080': 'Low',
      '#DC143C': 'Very Low',
      '#32CD32': 'Healthy mood',
      '#8A2BE2': 'Relaxed',
      '#FFFF00': 'Optimistic',
    };
    const moodCounts = recentEntries.reduce((counts, entry) => {
      const color = entry.mood_color;
      counts[color] = (counts[color] || 0) + 1;
      return counts;
    }, {});
    const mostCommonColor = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b
    );
    setMostCommonMood({
      color: mostCommonColor,
      mood: moodScale[mostCommonColor] || 'Unknown',
    });

    // Calculate average exercise
    const totalExercise = recentEntries.reduce(
      (sum, entry) => sum + (entry.exercise_duration || 0),
      0
    );
    setAverageExercise(totalExercise / recentEntries.length);

    // Calculate average hydration
    const totalHydration = recentEntries.reduce(
      (sum, entry) => sum + (entry.hydration_amount || 0),
      0
    );
    setAverageHydration(totalHydration / recentEntries.length);
  }, [entries]);

  return (
    <div className="weekly-insights">
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
