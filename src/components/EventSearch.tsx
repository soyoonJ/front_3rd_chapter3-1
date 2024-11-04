import { FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { EventItem } from './EventItem';
import { Event } from '../types';

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filteredEvents: Event[];
  notifiedEvents: string[];
  editEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
}

const EventSearch = ({
  searchTerm,
  setSearchTerm,
  filteredEvents,
  notifiedEvents,
  editEvent,
  deleteEvent,
}: Props) => {
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
