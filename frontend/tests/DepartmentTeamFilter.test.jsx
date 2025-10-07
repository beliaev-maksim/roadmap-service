import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DepartmentTeamFilter from '../src/components/DepartmentTeamFilter';

test('DepartmentTeamFilter renders and changes', () => {
  const departments = ['Engineering', 'Product'];
  const teams = ['Team A', 'Team B'];
  const onDepartmentChange = jest.fn();
  const onTeamChange = jest.fn();
  const { getByLabelText } = render(
    <DepartmentTeamFilter
      departments={departments}
      teams={teams}
      onDepartmentChange={onDepartmentChange}
      onTeamChange={onTeamChange}
    />
  );
  fireEvent.change(getByLabelText(/Department/i), { target: { value: 'Engineering' } });
  expect(onDepartmentChange).toHaveBeenCalledWith('Engineering');
  fireEvent.change(getByLabelText(/Team/i), { target: { value: 'Team B' } });
  expect(onTeamChange).toHaveBeenCalledWith('Team B');
});
