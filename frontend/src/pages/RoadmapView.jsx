import React, { useState, useEffect } from 'react';
import DepartmentTeamFilter from '../components/DepartmentTeamFilter';
import ProductReleaseFilter from '../components/ProductReleaseFilter';
import ColorLegend from '../components/ColorLegend';
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
    fetchRoadmap({ department, team }).then(setItems);
  }, [department, team]);

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
      <ul>
        {items
          .filter(item => !selectedProduct || item.product === selectedProduct)
          .filter(item => !selectedRelease || item.labels.includes(selectedRelease))
          .map(item => (
            <li key={item.id}>
              <span style={{color: item.color_status.carry_over?.color}}>
                {item.color_status.carry_over ? `Carry-over (${item.color_status.carry_over.count}) ` : ''}
              </span>
              <span style={{color: item.color_status.health.color}}>
                {item.name} ({item.department}/{item.team}) {item.color_status.health.label || ''}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
