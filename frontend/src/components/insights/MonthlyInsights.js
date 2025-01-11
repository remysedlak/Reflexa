import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
const WeeklyInsights = () => {
    <PieChart
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={200}
    />
};
export default WeeklyInsights;
