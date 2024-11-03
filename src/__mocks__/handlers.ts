import { http, HttpResponse } from 'msw';

import { Event } from '../types';
import { events } from './response/events.json' assert { type: 'json' };

// ! HARD
// ! 각 응답에 대한 MSW 핸들러핸들러핸들러핸들러를 작성해주세요. GET 요청은 이미 작성되어 있는 events json을 활용해주세요.

export const handlers = [
  http.get('/api/events', () => {
    return HttpResponse.json({ events });
  }),

  http.post('/api/events', async ({ request }) => {
    const body = await request.json();

    const newEvent = { ...(body as Event), id: String(events.length + 1) };

    return HttpResponse.json(newEvent, { status: 201 });
  }),

  // TODO: update/delete params 활용?
  http.put('/api/events/:id', async ({ request }) => {
    const updates = await request.json();

    return HttpResponse.json(updates);
  }),

  http.delete('/api/events/:id', ({ params }) => {
    return HttpResponse.json(null, { status: 204 });
  }),
];
