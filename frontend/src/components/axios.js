// src/utils/axiosInstance.js
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000';

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": 'application/json',
    accept: 'application/json',
  },
  withCredentials: true, // Ensure credentials are sent
});

// Function to handle fetching data from backend or fallback to mock data
export const fetchData = async (url) => {
  try {
    const response = await AxiosInstance.get(url); // Fetch from backend API
    return response.data;
  } catch (error) {
    console.error('Error fetching from backend, loading mock data:', error);
    // If backend is down, fetch from static data.json
    const mockData = await fetch('/data.json')
      .then(res => res.json())
      .catch(err => {
        console.error('Error loading mock data:', err);
        return []; // Return empty array if mock data fails
      });
    return mockData; // Return mock data
  }
};

export default AxiosInstance;
