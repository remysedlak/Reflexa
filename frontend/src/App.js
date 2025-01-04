// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar.js'; // Import the Navbar component
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Entry from './pages/Entry.js';
import About from './pages/About';                              // Custom styles


class App extends React.Component {
  state = { details: [] };

  componentDidMount() {
    // Fetch data from the backend API
    axios.defaults.withCredentials = true;

    axios
      .get('http://127.0.0.1:8000/api/days', { withCredentials: true })
      .then((res) => {
        const data = res.data;
        this.setState({ details: data });
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }

  render() {
    const { details } = this.state; // Accessing the state to pass as props

    return (
      <Router>
        <Navbar />  {/* Use Navbar here */}
        <Routes>
          <Route path="/" element={<Home details={details} />} />
          <Route path="/entry" element={<Entry details={details} />} />
          <Route path="/calendar" element={<Calendar entries={details} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
