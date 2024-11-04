import { Box, Flex } from '@chakra-ui/react';

import { Calendar } from './components/Calendar.tsx';
import { EventManageForm } from './components/EventManageForm.tsx';
import EventSearch from './components/EventSearch.tsx';
import Notification from './components/Notification.tsx';
import { OverlapAlertDialog } from './components/OverlapAlertDialog.tsx';

function App() {
  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventManageForm />
        <Calendar />
        <EventSearch />
      </Flex>

      <OverlapAlertDialog />
      <Notification />
    </Box>
  );
}

export default App;
