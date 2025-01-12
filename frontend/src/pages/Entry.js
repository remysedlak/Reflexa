import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, TextField, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../components/axios';
import dayjs from 'dayjs';

const Entry = () => {
  const { register, handleSubmit, reset } = useForm();
  const [moodColors, setMoodColors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch mood colors from API
    AxiosInstance.get('http://3.147.75.57:8000/api/mood-colors/')
      .then((response) => {
        setMoodColors(response.data.mood_colors);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching mood colors:', error);
        setLoading(false);
      });
  }, []);

  const onSubmit = async (data) => {
    const formatted_date = dayjs(data.entry_date).format("YYYY-MM-DD");
    const payload = {
      entry_date: formatted_date,
      entry_title: data.entry_title || null,
      entry_content: data.entry_content || null,
      mood_color: data.mood_color || "#808080",
      proper_nutrition: data.proper_nutrition || false,
      proper_hydration: data.proper_hydration || false,
      hydration_amount: data.hydration_amount || null,
      proper_exercise: data.proper_exercise || false,
      exercise_duration: data.exercise_duration || null,
      exercise_description: data.exercise_description || null,
      hours_of_sleep: data.hours_of_sleep || null,
    };

    try {
      await AxiosInstance.post('http://3.147.75.57:8000/api/days/', payload);
      reset();
    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxHeight: '100vh', overflowY: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        New Entry
      </Typography>
      <Box sx={{ maxHeight: '80vh', overflowY: 'auto', p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Entry Date"
              type="date"
              defaultValue={dayjs().format("YYYY-MM-DD")}
              InputLabelProps={{ shrink: true }}
              {...register("entry_date")}
            />
            <TextField
              label="Entry Title"
              {...register("entry_title")}
            />
            <TextField
              label="Entry Content"
              multiline
              rows={4}
              {...register("entry_content")}
            />
            <FormControl>
              <InputLabel>Mood Color</InputLabel>
              <Select
                defaultValue="#808080"
                {...register("mood_color")}
              >
                {moodColors.map((color) => (
                  <MenuItem key={color.value} value={color.value}>
                    {color.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox {...register("proper_nutrition")} />}
              label="Proper Nutrition"
            />
            <FormControlLabel
              control={<Checkbox {...register("proper_hydration")} />}
              label="Proper Hydration"
            />
            <TextField
              label="Hydration Amount"
              {...register("hydration_amount")}
            />
            <FormControlLabel
              control={<Checkbox {...register("proper_exercise")} />}
              label="Proper Exercise"
            />
            <TextField
              label="Exercise Duration"
              {...register("exercise_duration")}
            />
            <TextField
              label="Exercise Description"
              {...register("exercise_description")}
            />
            <TextField
              label="Hours of Sleep"
              {...register("hours_of_sleep")}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Entry;