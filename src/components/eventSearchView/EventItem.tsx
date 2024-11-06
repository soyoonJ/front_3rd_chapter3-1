import { BellIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import { NOTIFICATION_OPTIONS } from '../../constants/constants';
import { useEventForm } from '../../hooks/useEventForm';
import { useEventOperations } from '../../hooks/useEventOperations';
import { useNotifications } from '../../hooks/useNotifications';
import { Event } from '../../types';

interface Props {
  event: Event;
}

export const EventItem = ({ event }: Props) => {
  const { editingEvent, setEditingEvent } = useEventForm();
  const { events, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );
  const { notifiedEvents } = useNotifications(events);
  const { editEvent } = useEventForm();

  return (
    <Box key={event.id} borderWidth={1} borderRadius="lg" p={3} width="100%">
      <HStack justifyContent="space-between">
        <VStack align="start">
          <HStack>
            {notifiedEvents.includes(event.id) && <BellIcon color="red.500" />}
            <Text
              fontWeight={notifiedEvents.includes(event.id) ? 'bold' : 'normal'}
              color={notifiedEvents.includes(event.id) ? 'red.500' : 'inherit'}
            >
              {event.title}
            </Text>
          </HStack>
          <Text>{event.date}</Text>
          <Text>
            {event.startTime} - {event.endTime}
          </Text>
          <Text>{event.description}</Text>
          <Text>{event.location}</Text>
          <Text>카테고리: {event.category}</Text>
          {event.repeat.type !== 'none' && (
            <Text>
              반복: {event.repeat.interval}
              {event.repeat.type === 'daily' && '일'}
              {event.repeat.type === 'weekly' && '주'}
              {event.repeat.type === 'monthly' && '월'}
              {event.repeat.type === 'yearly' && '년'}
              마다
              {event.repeat.endDate && ` (종료: ${event.repeat.endDate})`}
            </Text>
          )}
          <Text>
            알림:{' '}
            {NOTIFICATION_OPTIONS.find((option) => option.value === event.notificationTime)?.label}
          </Text>
        </VStack>
        <HStack>
          <IconButton
            aria-label="Edit event"
            icon={<EditIcon />}
            onClick={() => editEvent(event)}
          />
          <IconButton
            aria-label="Delete event"
            icon={<DeleteIcon />}
            onClick={() => deleteEvent(event.id)}
          />
        </HStack>
      </HStack>
    </Box>
  );
};
