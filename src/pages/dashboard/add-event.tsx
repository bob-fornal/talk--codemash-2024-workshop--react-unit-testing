import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddEvent() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        data-testid="add-event-button"
        onClick={handleClickOpen}
      >
        Add Event
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Add an Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            data-testid="event-id-field"
            id="event-id"
            label="Event Id"
            type="text"
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button data-testid="cancel-button" onClick={handleClickClose}>Cancel</Button>
          <Button data-testid="submit-button" onClick={handleClickClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
