import { React, useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import BasicDatePicker from '../components/EntryForm/EntryDatePicker';
import MultilineTextFields from '../components/EntryForm/EntryMultilineTextField';
import BasicTextFields from '../components/EntryForm/EntryTextField';
import SelectVariants from '../components/EntryForm/EntrySelectField';
import { useForm } from 'react-hook-form';
import Checkboxes from '../components/EntryForm/EntryCheckBox';
import AxiosInstance from '../components/axios';
import dayjs from 'dayjs';

const Entry = () => {
  const [moodColors, setMoodColors] = useState([]);
  const [loading, setLoading] = useState(true);  // to handle loading state
  const defaultValues = {
    entry_date: dayjs(), // Default to current date using Day.js
    entry_content: '',
    mood_color: "#808080",
    proper_nutrition: false, // Default to false for checkbox
    proper_hydration: false, // Default to false for checkbox
    hydration_amount: '',
    proper_exercise: false, // Default to false for checkbox
    exercise_duration: '',
    exercise_description: '',
    hours_of_sleep: ''
  };

  const { handleSubmit, control } = useForm({ defaultValues });

  useEffect(() => {
    // Fetch mood colors from API
    AxiosInstance.get('/api/mood_colors/')
      .then((response) => {
        setMoodColors(response.data.mood_colors); // assuming the response has mood_colors
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching mood colors:', error);
        setLoading(false);
      });
  }, []);

  const submission = (data) => {
    const formatted_date = data.entry_date.format("YYYY-MM-DD"); // Format date
    const payload = {
      entry_date: formatted_date,
      entry_content: data.entry_content || null,
      mood_color: data.mood_color || "#808080",
      proper_nutrition: data.proper_nutrition || false,
      proper_hydration: data.proper_hydration || false,
      hydration_amount: data.hydration_amount ? parseFloat(data.hydration_amount) : null,
      proper_exercise: data.proper_exercise || false,
      exercise_duration: data.exercise_duration ? parseFloat(data.exercise_duration) : null,
      exercise_description: data.exercise_description || null,
      hours_of_sleep: data.hours_of_sleep ? parseFloat(data.hours_of_sleep) : null,
    };
  
    AxiosInstance.post('/api/days/', payload)
      .then(() => alert("Journal entry submitted successfully!"))
      .catch((error) => {
        console.error("Submission failed:", error);
        alert("Submission failed. Please check your input.");
      });
  };
  

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{ display: 'flex', width: '100%', marginBottom: '10px', marginTop: '10px', padding: '2px', alignItems: 'center' }}>
          <Typography sx={{ marginLeft: '20px', color: '#000000', fontWeight: 'bold', fontSize: '1.5rem' }}>
            Start a New Journal Entry
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column', boxSizing: 'border-box' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <BasicDatePicker label="Entry Date" name="entry_date" control={control} /> {/* Handle entry_date as a Day.js object */}

            <MultilineTextFields label="Entry Content" name="entry_content" control={control} placeholder="Write your journal entry" />

            {/* Pass moodColors prop to SelectVariants */}
            {!loading && <SelectVariants label="Mood Color" name="mood_color" control={control} moodColors={moodColors} />}

            <Checkboxes name="proper_nutrition" control={control} label="Proper Nutrition" />
            <Checkboxes name="proper_hydration" control={control} label="Proper Hydration" />
            <Checkboxes name="proper_exercise" control={control} label="Proper Exercise" />

            <BasicTextFields name="exercise_duration" control={control} label="Exercise Duration" />
            <BasicTextFields name="exercise_description" control={control} label="Exercise Description" />
            <BasicTextFields name="hours_of_sleep" control={control} label="Hours of Sleep" />
          </Box>

          <Box>
            <Button variant="contained" type="submit" sx={{ width: '100%' }}>
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Entry;
