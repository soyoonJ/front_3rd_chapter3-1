import { http, HttpResponse } from 'msw';

import { server } from '../setupTests';
import { Event } from '../types';

// ! Hard
// ! 이벤트는 생성, 수정 되면 fetch를 다시 해 상태를 업데이트 합니다. 이를 위한 제어가 필요할 것 같은데요. 어떻게 작성해야 테스트가 병렬로 돌아도 안정적이게 동작할까요?
// ! 아래 이름을 사용하지 않아도 되니, 독립적이게 테스트를 구동할 수 있는 방법을 찾아보세요. 그리고 이 로직을 PR에 설명해주세요.
export const setupMockHandlerCreation = (initEvents = [] as Event[]) => {
  server.use(
    http.get('/api/events', () => {
      return HttpResponse.json({ events: initEvents });
    }),
    http.post('/api/events', async ({ request }) => {
      const body = await request.json();

      const newEvent = { ...(body as Event), id: String(initEvents.length + 1) };
      initEvents.push(newEvent);

      return HttpResponse.json(newEvent, { status: 201 });
    })
  );
};

export const setupMockHandlerUpdating = (initEvents = [] as Event[]) => {
  server.use(
    http.get('/api/events', () => {
      return HttpResponse.json({ events: initEvents });
    }),

    http.put('/api/events/:id', async ({ request, params }) => {
      const { id } = params;

      const updatedEvent = await request.json();
      initEvents = initEvents.map((event) => (event.id === id ? (updatedEvent as Event) : event));

      return HttpResponse.json(updatedEvent);
    })
  );
};

export const setupMockHandlerDeletion = (initEvents = [] as Event[]) => {
  server.use(
    http.get('/api/events', () => {
      return HttpResponse.json({ events: initEvents });
    }),
    http.delete('/api/events/:id', ({ params }) => {
      const { id } = params;

      initEvents = initEvents.filter((event) => event.id !== id);

      return HttpResponse.json(null, { status: 204 });
    })
  );
};
