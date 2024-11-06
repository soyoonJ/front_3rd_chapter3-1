import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import React from 'react';

import { EventManageForm } from '../components/eventManageView/EventManageForm';
import { editingEventAtom } from '../hooks/useEventForm';

interface ProviderProps {
  initialValues: [atom: any, value: any][];
  children: React.ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: ProviderProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({ initialValues, children }: ProviderProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

const renderEventManageForm = (initialValues?: [atom: any, value: any][]) => {
  if (initialValues) {
    return render(
      <ChakraProvider>
        <TestProvider initialValues={initialValues}>
          <EventManageForm />
        </TestProvider>
      </ChakraProvider>
    );
  } else {
    return render(
      <ChakraProvider>
        <Provider>
          <EventManageForm />
        </Provider>
      </ChakraProvider>
    );
  }
};
it('아무것도 입력하지 않고 일정 추가 시 필수 정보를 모두 입력해주세요 문구가 뜬다.', async () => {
  renderEventManageForm();

  await userEvent.click(screen.getByRole('button', { name: /일정 추가/ }));

  expect(screen.getByText('필수 정보를 모두 입력해주세요.')).toBeInTheDocument();
});

describe('EventManageForm 타이틀', () => {
  it('editingEvent가 null인 경우 일정 추가 타이틀이 뜬다.', () => {
    renderEventManageForm();

    const eventFormTitle = screen.getByTestId('event-form-title');

    expect(within(eventFormTitle).getByText('일정 추가')).toBeInTheDocument();
  });

  it('editingEvent가 null이 아닌 경우 일정 수정 타이틀이 뜬다.', () => {
    renderEventManageForm([[editingEventAtom, { id: '1' }]]);

    const eventFormTitle = screen.getByTestId('event-form-title');

    expect(within(eventFormTitle).getByText('일정 수정')).toBeInTheDocument();
  });
});

describe('반복 설정 토글 옵션', () => {
  it('반복 일정 미설정 시 반복 유형 옵션이 뜨지 않는다.', async () => {
    renderEventManageForm();

    const repeatTypeSelect = screen.queryByLabelText(/반복 유형/);
    const repeatInterval = screen.queryByLabelText(/반복 간격/);
    const repeatEnd = screen.queryByLabelText(/반복 종료일/);

    expect(repeatTypeSelect).not.toBeInTheDocument();
    expect(repeatInterval).not.toBeInTheDocument();
    expect(repeatEnd).not.toBeInTheDocument();
  });

  it('반복 일정 설정 시 반복 유형 옵션이 뜬다.', async () => {
    renderEventManageForm();

    const repeatCheckbox = screen.getByRole('checkbox', { name: /반복 일정/ });
    await userEvent.click(repeatCheckbox);

    const repeatTypeSelect = screen.getByLabelText(/반복 유형/);
    const repeatInterval = screen.getByLabelText(/반복 간격/);
    const repeatEnd = screen.getByLabelText(/반복 종료일/);

    expect(repeatTypeSelect).toBeInTheDocument();
    expect(repeatInterval).toBeInTheDocument();
    expect(repeatEnd).toBeInTheDocument();
  });
});
