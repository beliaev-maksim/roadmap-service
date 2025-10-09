import React from 'react';
import { render, screen } from '@testing-library/react';
import RoadmapTable from '../components/RoadmapTable';

const mockData = [
  {
    id: 'product-a',
    name: 'Product A',
    items: [
      {
        id: 'item-1',
        carryOverStatus: 'Carry-over (2)',
        roadmapStatus: 'On Track',
        name: 'Feature 1',
        jiraLink: 'https://jira.example.com/item-1',
        colorStatus: {
          carry_over: { color: 'purple' },
          health: { color: 'green' },
        },
      },
      {
        id: 'item-2',
        carryOverStatus: '',
        roadmapStatus: 'At Risk',
        name: 'Feature 2',
        jiraLink: 'https://jira.example.com/item-2',
        colorStatus: {
          carry_over: null,
          health: { color: 'orange' },
        },
      },
    ],
  },
  {
    id: 'product-b',
    name: 'Product B',
    items: [
      {
        id: 'item-3',
        carryOverStatus: 'Carry-over (1)',
        roadmapStatus: 'Delayed',
        name: 'Feature 3',
        jiraLink: 'https://jira.example.com/item-3',
        colorStatus: {
          carry_over: { color: 'purple' },
          health: { color: 'red' },
        },
      },
    ],
  },
];

const visibleColumns = {
  carryOver: true,
  roadmapStatus: true,
  itemName: true,
};

test('renders RoadmapTable with product sections', () => {
  render(<RoadmapTable data={mockData} visibleColumns={visibleColumns} />);

  expect(screen.getByText('Product A')).toBeInTheDocument();
  expect(screen.getByText('Product B')).toBeInTheDocument();
});

test('renders RoadmapItems with correct data', () => {
  render(<RoadmapTable data={mockData} visibleColumns={visibleColumns} />);

  expect(screen.getByText('Feature 1')).toBeInTheDocument();
  expect(screen.getByText('Feature 2')).toBeInTheDocument();
  expect(screen.getByText('Feature 3')).toBeInTheDocument();

  expect(screen.getByText('Carry-over (2)')).toBeInTheDocument();
  expect(screen.getByText('On Track')).toBeInTheDocument();
  expect(screen.getByText('At Risk')).toBeInTheDocument();
  expect(screen.getByText('Delayed')).toBeInTheDocument();
});

test('renders Jira links correctly', () => {
  render(<RoadmapTable data={mockData} visibleColumns={visibleColumns} />);

  const feature1Link = screen.getByText('Feature 1');
  expect(feature1Link).toHaveAttribute('href', 'https://jira.example.com/item-1');
});
