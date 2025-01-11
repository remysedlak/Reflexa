import { React} from 'react'
import { Typography } from '@mui/material';
import WeeklyInsights from '../components/insights/WeeklyInsights';
import MonthlyInsights from '../components/insights/MonthlyInsights';

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
    <Typography
        sx={{
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
        }}
      >
      </Typography>
      <MonthlyInsights entries={details} />
    </div>
</div>

)
export default Insights;