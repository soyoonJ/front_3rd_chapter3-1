import { VStack } from '@chakra-ui/react';

import { NotificationAlert } from './NotificationAlert';
import { useNotifications } from '../hooks/useNotifications';
import { Event } from '../types';

interface Props {
  events: Event[];
}

const Notification = ({ events }: Props) => {
  const { notifications, setNotifications } = useNotifications(events);

  return (
    <>
      {notifications.length > 0 && (
        <VStack position="fixed" top={4} right={4} spacing={2} align="flex-end">
          {notifications.map((notification, index) => (
            <NotificationAlert
              key={index}
              notification={notification}
              onClick={() => setNotifications((prev) => prev.filter((_, i) => i !== index))}
            />
          ))}
        </VStack>
      )}
    </>
  );
};

export default Notification;
