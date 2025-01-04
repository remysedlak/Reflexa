import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TrashButton({ entryId, onDelete }) {
    const handleDelete = () => {
        // Send DELETE request to the backend
        fetch(`/api/journal/${entryId}/`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);  // Success
                onDelete(entryId);  // Optionally, update the UI by removing the entry
            } else {
                console.error(data.error);  // Error handling
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <IconButton onClick={handleDelete} color="secondary" aria-label="delete">
            <DeleteIcon />
        </IconButton>
    );
}

export default TrashButton;
