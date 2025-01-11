import React from 'react';
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const EntryCard = ({ entry, open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Journal Entry</DialogTitle>
            <DialogContent>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {entry.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {entry.date}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {entry.content}
                        </Typography>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EntryCard;