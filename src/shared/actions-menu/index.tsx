import { useState } from 'react';

import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type ActionsMenuProps = { eventId: number, taskId: string };

export default function ActionsMenu({ eventId, taskId }: ActionsMenuProps) {
  const [anchorElement, setAnchorElement] = useState(null);
  const open = Boolean(anchorElement);

  const handleClickOpen = (event: any) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClickClose = () => {
    setAnchorElement(null);
  };

  const handleClickAssignTo = () => {
    console.log(eventId, taskId);
    setAnchorElement(null);
  };

  const handleClickData = () => {
    console.log(eventId, taskId);
    setAnchorElement(null);
  };

  return (
    <>
      <Button
        data-testid="actions-menu-button"
        id="actions-menu-button"
        variant='contained'
        disableElevation
        onClick={handleClickOpen}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Actions
      </Button>
      <Menu
        data-testid="actions-menu"
        id="actions-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={handleClickClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          data-testid="actions-menu-assign-to"
          onClick={handleClickAssignTo}
        >
          Assign To
        </MenuItem>
        <MenuItem
          data-testid="actions-menu-console"
          onClick={handleClickData}
        >
          Console Data
        </MenuItem>
      </Menu>
    </>
  );
}
