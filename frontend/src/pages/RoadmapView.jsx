import React, { useState, useEffect } from 'react';
import DepartmentTeamFilter from '../components/DepartmentTeamFilter';
import ProductReleaseFilter from '../components/ProductReleaseFilter';
import ColorLegend from '../components/ColorLegend';
import RoadmapTable from '../components/RoadmapTable';
import { fetchRoadmap } from '../services/roadmapApi';

export default function RoadmapView() {
  const [department, setDepartment] = useState('');
  const [team, setTeam] = useState('');
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [selectedRelease, setSelectedRelease] = React.useState('');
  const [items, setItems] = useState([]);
  const departments = ['Engineering', 'Product']; // TODO: fetch from API
  const teams = ['Team A', 'Team B']; // TODO: fetch from API
  const products = Array.from(new Set(items.map(i => i.product).filter(Boolean)));
  const releases = Array.from(new Set(items.flatMap(i => i.labels)));

  useEffect(() => {
    fetchRoadmap({ department, team }).then(res => setItems(res.items || []));
  }, [department, team]);

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
        carryOverStatus: item.color_status.carry_over ? `Carry-over (${item.color_status.carry_over.count})` : '',
        roadmapStatus: item.color_status.health.label || '',
        name: item.name,
        jiraLink: item.url,
        colorStatus: item.color_status,
      });
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const filteredItems = items
    .filter(item => !selectedProduct || item.product === selectedProduct)
    .filter(item => !selectedRelease || item.labels.includes(selectedRelease));

  const roadmapData = groupItemsByProduct(filteredItems);

  const visibleColumns = {
    carryOver: roadmapData.some(p => p.items.some(i => i.carryOverStatus)),
    roadmapStatus: roadmapData.some(p => p.items.some(i => i.roadmapStatus)),
    itemName: true, // Always show item name
  };

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
      <RoadmapTable data={roadmapData} visibleColumns={visibleColumns} />
    </div>
  );
}
