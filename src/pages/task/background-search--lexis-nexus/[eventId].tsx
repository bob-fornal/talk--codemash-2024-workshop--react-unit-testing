import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import Header from '@shared/header';

import { api } from '@core/api';

import style from '@styles/TaskPage.module.css';
import ActionsMenu from '@shared/actions-menu';

export default function TaskPage() {
  const router = useRouter();
  const { eventId } = router.query;

  const defaultEvent = {
    eventId: -1,
    eventType: '',
    assignedTo: '',
    statusType: '',
    dateCreated: '',
    tasks: []
  }
  const defaultTask = {
    key: '',
    assignedTo: '',
    statusType: '',
    dateCreated: ''
  }
  const [event, setEvent] = useState(defaultEvent);
  const [task, setTask] = useState(defaultTask);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getEventData()
      .then((data: any) => {
        if (eventId === undefined) return;

        const foundEvent = data.filter((item: any) => `${item.eventId}` === eventId)[0];
        setEvent(foundEvent);
        const foundTask = foundEvent.tasks.filter((item: any) => item.key === 'background-search--lexis-nexus')[0];
        setTask(foundTask);
        setLoading(false);
      })
      .catch(console.log);
  }, [eventId, router.isReady]);

  if (isLoading === true) return <p>Loading ...</p>;
  
  return (
    <>
      <Header title="Background Search: Lexis Nexus" />
      <Card className={style.eventCard} variant="outlined">
        <CardHeader title="Event Data" />
        <CardContent>
          <div>Event Id: {event.eventId}</div>
          <div><span>Event Type</span>: {event.eventType}</div>
          <div><span>Assigned To</span>: {event.assignedTo}</div>
          <div><span>Status</span>: {event.statusType}</div>
          <div><span>Date Create</span>: {event.dateCreated}</div>
          <ActionsMenu eventId={event.eventId} taskId={task.key} />
        </CardContent>
      </Card>

      <Card className={style.taskCard} variant="outlined">
        <CardHeader title="Task SPECIFIC Data" />
        <CardContent>
          <div><span>Task Id</span>: {task.key}</div>
          <div><span>Assigned To</span>: {task.assignedTo}</div>
          <div><span>Status</span>: {task.statusType}</div>
          <div><span>Date Created</span>: {task.dateCreated}</div>
        </CardContent>
      </Card>

      <Card className={style.workNotesCard} variant="outlined">
        <CardHeader title="Work Notes" />
        <CardContent>WORK NOTES</CardContent>
      </Card>
    </>
  );
}