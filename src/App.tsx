import { Box, Flex } from '@chakra-ui/react';

import { Calendar } from './components/Calendar.tsx';
import { EventManageForm } from './components/EventManageForm.tsx';
import EventSearch from './components/EventSearch.tsx';
import Notification from './components/Notification.tsx';
import { OverlapAlertDialog } from './components/OverlapAlertDialog.tsx';
import { useEventForm } from './hooks/useEventForm.ts';
import { useEventOperations } from './hooks/useEventOperations.ts';

function App() {
  const { editingEvent, setEditingEvent } = useEventForm();
  const { events, saveEvent, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventManageForm events={events} saveEvent={saveEvent} />
        <Calendar events={events} />
        <EventSearch events={events} deleteEvent={deleteEvent} />
      </Flex>

      <OverlapAlertDialog onSave={saveEvent} />
      <Notification events={events} />
    </Box>
  );
}

export default App;
