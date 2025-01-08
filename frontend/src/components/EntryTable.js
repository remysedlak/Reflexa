import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css"; // Make sure this is imported as well

const EntryTable = () => {
  const [metaKey,] = useState(true);
  const [daysData, setDaysData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  // Fetch data from the Django REST API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/days'); // Ensure this endpoint is correct
        const data = await response.json();

        // Sort entries by date (latest first)
        const sortedData = data.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));

        // Limit to the 3-5 most recent entries (you can adjust the number here)
        const recentEntries = sortedData.slice(0, 3); // Change 5 to 3 for fewer entries

        setDaysData(recentEntries);
      } catch (error) {
        console.error('Error fetching days data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="entry-table-container">
      {/* DataTable for Days Data */}
      <DataTable
        value={daysData}
        selectionMode="single"
        selection={selectedDay}
        onSelectionChange={(e) => setSelectedDay(e.value)}
        dataKey="entry_date"
        metaKeySelection={metaKey}
        scrollable={true} // Enable scroll when data overflows
        style={{ width: '100%' }} // Make the DataTable responsive
        scrollDirection="horizontal" // Enable horizontal scrolling if necessary
        tableStyle={{ width: '100%', minWidth: '100%' }}
      >
        <Column field="entry_date" header="Date" style={{ minWidth: '150px' }} />
        <Column field="entry_title" header="Title" style={{ minWidth: '200px' }} />
        <Column field="hours_of_sleep" header="Sleep Hours" style={{ minWidth: '150px' }} />
      </DataTable>
    </div>
  );
};

export default EntryTable;
