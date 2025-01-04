import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';

import "primereact/resources/themes/lara-light-cyan/theme.css";


const EntryTable = () => {
  const [metaKey, setMetaKey] = useState(true);
  const [daysData, setDaysData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  // Fetch data from the Django REST API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/days/'); // Ensure this endpoint is correct
        const data = await response.json();
        setDaysData(data);
      } catch (error) {
        console.error('Error fetching days data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      
      {/* DataTable for Days Data */}
      <DataTable
        value={daysData}
        selectionMode="single"
        selection={selectedDay}
        onSelectionChange={(e) => setSelectedDay(e.value)}
        dataKey="entry_date"
        metaKeySelection={metaKey}
        tableStyle={{ minWidth: '60rem' }}
      >
        <Column field="entry_date" header="Date"></Column>
        <Column field="entry_title" header="Title"></Column>
        <Column field="mood_color" header="Mood Color"></Column>
        <Column field="hours_of_sleep" header="Sleep Hours"></Column>
      </DataTable>
    </div>
  );
};

export default EntryTable;
