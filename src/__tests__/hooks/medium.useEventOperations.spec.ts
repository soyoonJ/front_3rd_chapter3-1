import { act, renderHook } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import {
  setupMockHandlerCreation,
  setupMockHandlerDeletion,
  setupMockHandlerUpdating,
} from '../../__mocks__/handlersUtils.ts';
import { useEventOperations } from '../../hooks/useEventOperations.ts';
import { server } from '../../setupTests.ts';
import { Event } from '../../types.ts';

it('저장되어있는 초기 이벤트 데이터를 적절하게 불러온다', async () => {
  const { result } = renderHook(() => useEventOperations(false, () => {}));

  await act(async () => {
    await result.current.fetchEvents();
  });

  expect(result.current.events).toEqual([
    {
      id: '1',
      title: '기존 회의',
      date: '2024-10-15',
      startTime: '09:00',
      endTime: '10:00',
      description: '기존 팀 미팅',
      location: '회의실 B',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ]);
});

it('정의된 이벤트 정보를 기준으로 적절하게 저장이 된다', async () => {
  // useEventOperations 첫번째 파라미터 editing: false
  const initEvents = [
    {
      id: '1',
      title: '기존 회의',
      date: '2024-10-15',
      startTime: '09:00',
      endTime: '10:00',
      description: '기존 팀 미팅',
      location: '회의실 B',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '2',
      title: '기존 회의',
      date: '2024-10-15',
      startTime: '09:00',
      endTime: '10:00',
      description: '기존 팀 미팅',
      location: '회의실 B',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];
  setupMockHandlerCreation(initEvents as Event[]);

  const { result } = renderHook(() => useEventOperations(false, () => {}));

  const newEvent = {
    title: '커피 한 잔 마시기 new',
    startTime: '11:00',
    endTime: '12:00',
    description: '커피 한 잔 마시기',
    location: '카페',
    category: '기타',
    date: '2021-10-20',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 0,
  };

  await act(async () => {
    await result.current.saveEvent(newEvent as Event);
  });

  await act(async () => {
    await result.current.fetchEvents();
  });

  expect(result.current.events).toHaveLength(3);
  expect(result.current.events[2]).toEqual({ ...newEvent, id: '3' });
});

it("새로 정의된 'title', 'endTime' 기준으로 적절하게 일정이 업데이트 된다", async () => {
  const initEvents = [
    {
      id: '1',
      title: '기존 회의',
      date: '2024-10-15',
      startTime: '09:00',
      endTime: '10:00',
      description: '기존 팀 미팅',
      location: '회의실 B',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];
  setupMockHandlerUpdating(initEvents as Event[]);

  const { result } = renderHook(() => useEventOperations(true, () => {}));

  const updatedEvent = {
    id: '1',
    title: '기존 회의 updated',
    date: '2024-10-15',
    startTime: '09:00',
    endTime: '11:00',
    description: '기존 팀 미팅',
    location: '회의실 B',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  };

  await act(async () => {
    await result.current.saveEvent(updatedEvent as Event);
  });

  await act(async () => {
    await result.current.fetchEvents();
  });

  expect(result.current.events).toEqual([updatedEvent]);
});

it('존재하는 이벤트 삭제 시 에러없이 아이템이 삭제된다.', async () => {
  const initEvents = [
    {
      id: '1',
      title: '기존 회의',
      date: '2024-10-15',
      startTime: '09:00',
      endTime: '10:00',
      description: '기존 팀 미팅',
      location: '회의실 B',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];
  setupMockHandlerDeletion(initEvents as Event[]);

  const { result } = renderHook(() => useEventOperations(false, () => {}));

  await act(async () => {
    await result.current.deleteEvent('1');
  });

  await act(async () => {
    await result.current.fetchEvents();
  });

  expect(result.current.events).toEqual([]);
});

it("이벤트 로딩 실패 시 '이벤트 로딩 실패'라는 텍스트와 함께 에러 토스트가 표시되어야 한다", async () => {});

it("존재하지 않는 이벤트 수정 시 '일정 저장 실패'라는 토스트가 노출되며 에러 처리가 되어야 한다", async () => {});

it("네트워크 오류 시 '일정 삭제 실패'라는 텍스트가 노출되며 이벤트 삭제가 실패해야 한다", async () => {});
