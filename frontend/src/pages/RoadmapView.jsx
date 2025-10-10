import React, { useState, useEffect } from 'react';
import DepartmentTeamFilter from '../components/DepartmentTeamFilter';
import ProductReleaseFilter from '../components/ProductReleaseFilter';
import ColorLegend from '../components/ColorLegend';
import RoadmapTable from '../components/RoadmapTable';
import { getRoadmapData, getSyncStatus } from '../services/roadmapApi';
import { Box } from '@mui/material';

export default function RoadmapView() {
  const [department, setDepartment] = useState('');
  const [team, setTeam] = useState('');
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [selectedRelease, setSelectedRelease] = React.useState('');
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null);
  const departments = ['Engineering', 'Product']; // TODO: fetch from API
  const teams = ['Team A', 'Team B']; // TODO: fetch from API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const status = await getSyncStatus();
        setSyncStatus(status);

        if (status.status === 'success' || status.status === 'idle') {
          // Only fetch data if the sync is done or was already done
          const data = await getRoadmapData();
          setItems(data || []); // Ensure data is always an array
          
          // Explicitly set products and releases after data is fetched
          if (data) {
            setProducts(Array.from(new Set(data.map(i => i.product).filter(Boolean))));
            setReleases(Array.from(new Set(data.flatMap(i => i.tags || []))));
          }

          setLoading(false);
        } else if (status.status === 'syncing' || status.status === 'processing') {
          // If syncing, poll for status updates every 5 seconds
          setTimeout(fetchData, 5000);
        } else if (status.status === 'failed') {
          setError(`Failed to sync data from Jira. Error: ${status.error}`);
          setLoading(false);
        }
      } catch (err) {
        setError(`An error occurred while fetching data: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupItemsByProduct = (items) => {
    const grouped = items.reduce((acc, item) => {
      const product = item.product || 'Uncategorized';
      if (!acc[product]) {
        acc[product] = {
          id: product,
          name: product,
          items: [],
        };
      }
      acc[product].items.push({
        id: item.id,
        carryOverStatus: item.color_status?.carry_over ? `Carry-over (${item.color_status.carry_over.count})` : '',
        roadmapStatus: item.color_status?.health?.label || '',
        name: item.title,
        jiraLink: item.url,
        colorStatus: item.color_status,
      });
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const filteredItems = items
    .filter(item => !selectedProduct || item.product === selectedProduct)
    .filter(item => !selectedRelease || (item.tags && item.tags.includes(selectedRelease)));

  const roadmapData = groupItemsByProduct(filteredItems);

  const visibleColumns = {
    // These columns are no longer available in the data.
    carryOver: true,
    roadmapStatus: true,
    itemName: true, // Always show item name
  };

  if (loading) {
    return <div>Loading roadmap data... Current status: {syncStatus?.status || 'initializing'}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <DepartmentTeamFilter
        departments={departments}
        teams={teams}
        onDepartmentChange={setDepartment}
        onTeamChange={setTeam}
      />
      <ProductReleaseFilter
        products={products}
        releases={releases}
        selectedProduct={selectedProduct}
        selectedRelease={selectedRelease}
        onProductChange={setSelectedProduct}
        onReleaseChange={setSelectedRelease}
      />
      <ColorLegend />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
        {roadmapData.map((product) => (
          <div key={product.id} data-testid={`product-section-${product.name}`}>
            <RoadmapTable data={[product]} visibleColumns={visibleColumns} />
          </div>
        ))}
      </Box>
    </div>
  );
}
