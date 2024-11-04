import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react';
import { RefObject } from 'react';

import { Event } from '../types';

interface Props {
  isOverlapDialogOpen: boolean;
  cancelRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
  overlappingEvents: Event[];
  onClick: () => void;
}

export const OverlapAlertDialog = ({
  isOverlapDialogOpen,
  cancelRef,
  onClose,
  overlappingEvents,
  onClick,
}: Props) => {
  return (
    <AlertDialog isOpen={isOverlapDialogOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            일정 겹침 경고
          </AlertDialogHeader>

          <AlertDialogBody>
            다음 일정과 겹칩니다:
            {overlappingEvents.map((event) => (
              <Text key={event.id}>
                {event.title} ({event.date} {event.startTime}-{event.endTime})
              </Text>
            ))}
            계속 진행하시겠습니까?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClick}>
              취소
            </Button>
            <Button colorScheme="red" onClick={onClick} ml={3}>
              계속 진행
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
