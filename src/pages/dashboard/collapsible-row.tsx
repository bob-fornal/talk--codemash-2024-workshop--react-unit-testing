import { useState } from 'react';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ActionsMenu from '@shared/actions-menu';

type RowProps = { row: any };

export default function CollapsibleRow({ row }: RowProps): any {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            data-testid="toggle-button"
            size="small"
            onClick={() => setOpen(!open)}
          >
            { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.eventType}
        </TableCell>
        <TableCell>
          {row.assignedTo}
        </TableCell>
        <TableCell>
          {row.statusType}
        </TableCell>
        <TableCell>
          {row.dateCreated}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className='title'>Tasks</div>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row">Task Type</TableCell>
                    <TableCell component="th" scope="row">Assigned To</TableCell>
                    <TableCell component="th" scope="row">Status</TableCell>
                    <TableCell component="th" scope="row">Date Created</TableCell>
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell component="th" scope="row">Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.tasks.map((task: any) => (
                    <TableRow key={task.key}>
                      <TableCell component="th" scope="row">
                        {task.key}
                      </TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>{task.statusType}</TableCell>
                      <TableCell>{task.dateCreated}</TableCell>
                      <TableCell>
                        <ActionsMenu eventId={row.eventId} taskId={task.key} />
                      </TableCell>
                      <TableCell>
                        <Link href={`task/${task.key}/${row.eventId}`}>PAGE</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}