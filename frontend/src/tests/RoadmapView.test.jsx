import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoadmapView from '../pages/RoadmapView';
import { getRoadmapData, getSyncStatus } from '../services/roadmapApi';

jest.mock('../services/roadmapApi');

const mockRoadmapData = [
  {
    id: 1,
    jira_key: 'PROJ-1',
    title: 'Feature A',
    description: 'Description for Feature A',
    status: 'In Progress',
    release: 'R1',
    tags: ['R1'],
    product: 'Product A',
    color_status: {
      carry_over: { color: 'purple', count: 1 },
      health: { color: 'green', label: 'On Track' },
    },
    url: 'http://jira/PROJ-1',
  },
  {
    id: 2,
    jira_key: 'PROJ-2',
    title: 'Feature B',
    description: 'Description for Feature B',
    status: 'To Do',
    release: 'R1',
    tags: ['R1'],
    product: 'Product B',
    color_status: {
      carry_over: null,
      health: { color: 'orange', label: 'At Risk' },
    },
    url: 'http://jira/PROJ-2',
  },
];

describe('RoadmapView', () => {
  beforeEach(() => {
    // Reset mocks before each test to ensure a clean state
    jest.clearAllMocks();
  });

  it('should display a loading message and then the roadmap data', async () => {
    getSyncStatus.mockResolvedValue({ status: 'success' });
    getRoadmapData.mockResolvedValue(mockRoadmapData);

    render(<RoadmapView />);

    expect(await screen.findByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
  });

  it('should show an error if the status call fails', async () => {
    getSyncStatus.mockRejectedValue(new Error('API Error'));
    render(<RoadmapView />);
    expect(await screen.findByText(/Error: An error occurred/i)).toBeInTheDocument();
  });

  it('should filter the roadmap data when a product is selected', async () => {
    const user = userEvent.setup();
    // GIVEN: Mocks are defined before rendering
    getSyncStatus.mockResolvedValue({ status: 'success' });
    getRoadmapData.mockResolvedValue(mockRoadmapData);

    // WHEN: The component is rendered
    render(<RoadmapView />);

    // THEN: Wait for the product sections to be visible
    expect(await screen.findByTestId('product-section-Product A')).toBeVisible();
    expect(await screen.findByTestId('product-section-Product B')).toBeVisible();

    // Find the product filter and select an option
    const productFilter = screen.getByLabelText('Product');
    await user.selectOptions(productFilter, 'Product A');

    // Assert that the view has been filtered correctly
    expect(screen.getByTestId('product-section-Product A')).toBeVisible();
    expect(screen.queryByTestId('product-section-Product B')).not.toBeInTheDocument();
  });

  it('should render product tables within a single container for side-by-side layout', async () => {
    // GIVEN
    getSyncStatus.mockResolvedValue({ status: 'success' });
    getRoadmapData.mockResolvedValue(mockRoadmapData);

    // WHEN
    render(<RoadmapView />);

    // THEN
    const productA = await screen.findByTestId('product-section-Product A');
    const productB = await screen.findByTestId('product-section-Product B');

    // Assert that both product sections share the same parent element,
    // which is the structure required for the flexbox layout to work.
    expect(productA.parentElement).toBe(productB.parentElement);

    // ALSO assert that the parent container has the correct flexbox styling.
    // This ensures the test will fail if the CSS is changed.
    expect(productA.parentElement).toHaveStyle('display: flex');
  });
});
