import { React} from 'react'
import { Typography } from '@mui/material';
import WeeklyInsights from '../components/insights/WeeklyInsights';

const Insights = ({ details }) => (

<div>
    <div className="weekly-insights-section">
      <Typography
        sx={{
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
        }}
      >
      </Typography>
      <WeeklyInsights entries={details} />
    </div>



    <div class = "monthlyinsights">
        <h1>Your Month</h1>
    </div>
</div>

)
export default Insights;