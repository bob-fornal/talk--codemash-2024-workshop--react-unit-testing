
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Header from '@shared/header';

import { api } from '@core/api';

import style from '@styles/Dashboard.module.css';

import AddEvent from './add-event';
import CollapsibleRow from './collapsible-row';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getEventData()
      .then((data: any) => {
        setData(data);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  if (isLoading === true) return <p>Loading ...</p>;

  return (
    <>
      <Header />
      <div className={style.dashboardWrapper}>
        <div className={style.filter}>
          <Card className={style.filterCard} variant="outlined">
            <CardHeader title="Filter" />
            <CardContent>FILTER</CardContent>
          </Card>
        </div>
        <div className={style.content}>
          <div className={style.tools}>
            <AddEvent />
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row"/>
                  <TableCell component="th" scope="row">Event Type</TableCell>
                  <TableCell component="th" scope="row">Assigned To</TableCell>
                  <TableCell component="th" scope="row">Status</TableCell>
                  <TableCell component="th" scope="row">Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any) => (
                  <CollapsibleRow key={row.eventId} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
