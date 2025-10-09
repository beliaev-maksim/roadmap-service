import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RoadmapView from '../pages/RoadmapView';
import { fetchRoadmap } from '../services/roadmapApi';

jest.mock('../services/roadmapApi');

const mockItems = {
  items: [
    { id: 1, product: 'Product A', labels: ['R1'], name: 'Feature A', url: 'http://jira/A', color_status: { carry_over: { count: 1 }, health: { label: 'On Track' } } },
    { id: 2, product: 'Product A', labels: ['R2'], name: 'Feature B', url: 'http://jira/B', color_status: { carry_over: null, health: { label: 'At Risk' } } },
    { id: 3, product: 'Product B', labels: ['R1'], name: 'Feature C', url: 'http://jira/C', color_status: { carry_over: { count: 2 }, health: { label: 'Delayed' } } },
  ],
};

beforeEach(() => {
  fetchRoadmap.mockResolvedValue(mockItems);
});

test('renders the component and filters correctly', async () => {
  render(<RoadmapView />);

  // Wait for initial data to load
  expect(await screen.findByText('Feature A')).toBeInTheDocument();
  expect(screen.getByText('Feature B')).toBeInTheDocument();
  expect(screen.getByText('Feature C')).toBeInTheDocument();

  // Filter by product
  const productFilter = screen.getByLabelText('Product');
  fireEvent.change(productFilter, { target: { value: 'Product A' } });

  expect(screen.queryByText('Feature C')).not.toBeInTheDocument();
  expect(screen.getByText('Feature A')).toBeInTheDocument();

  // Filter by release
  const releaseFilter = screen.getByLabelText('Release');
  fireEvent.change(releaseFilter, { target: { value: 'R2' } });

  expect(screen.queryByText('Feature A')).not.toBeInTheDocument();
  expect(screen.getByText('Feature B')).toBeInTheDocument();
});

test('hides empty columns when filtering', async () => {
  render(<RoadmapView />);

  // Wait for initial data to load
  expect(await screen.findByText('Feature A')).toBeInTheDocument();

  // Initially, all columns should be visible
  expect(screen.getAllByText('Carry-over status')[0]).toBeInTheDocument();
  expect(screen.getAllByText('Roadmap status')[0]).toBeInTheDocument();

  // Filter to a product with no carry-over items
  const productFilter = screen.getByLabelText('Product');
  fireEvent.change(productFilter, { target: { value: 'Product A' } });
  
  const releaseFilter = screen.getByLabelText('Release');
  fireEvent.change(releaseFilter, { target: { value: 'R2' } });

  // "Carry-over status" should be hidden
  expect(screen.queryByText('Carry-over status')).not.toBeInTheDocument();
  // Other columns should still be visible
  expect(screen.getByText('Roadmap status')).toBeInTheDocument();
});
