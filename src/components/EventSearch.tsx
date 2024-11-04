import { FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';

import { EventItem } from './EventItem';
import { useCalendarView } from '../hooks/useCalendarView';
import { useEventForm } from '../hooks/useEventForm';
import { useNotifications } from '../hooks/useNotifications';
import { useSearch } from '../hooks/useSearch';
import { Event } from '../types';

interface Props {
  events: Event[];
  deleteEvent: (eventId: string) => void;
}

const EventSearch = ({ events, deleteEvent }: Props) => {
  const { view, currentDate } = useCalendarView();
  const { searchTerm, filteredEvents, setSearchTerm } = useSearch(events, currentDate, view);
  const { editEvent } = useEventForm();
  const { notifiedEvents } = useNotifications(events);

  return (
    <VStack data-testid="event-list" w="500px" h="full" overflowY="auto">
      <FormControl>
        <FormLabel>일정 검색</FormLabel>
        <Input
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormControl>

      {filteredEvents.length === 0 ? (
        <Text>검색 결과가 없습니다.</Text>
      ) : (
        filteredEvents.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            notifiedEvents={notifiedEvents}
            onEdit={() => editEvent(event)}
            onDelete={() => deleteEvent(event.id)}
          />
        ))
      )}
    </VStack>
  );
};

export default EventSearch;
