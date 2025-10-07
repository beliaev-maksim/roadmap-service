import React, { useState, useEffect } from 'react';
import DepartmentTeamFilter from '../components/DepartmentTeamFilter';
import ColorLegend from '../components/ColorLegend';
import { fetchRoadmap } from '../services/roadmapApi';

export default function RoadmapView() {
  const [department, setDepartment] = useState('');
  const [team, setTeam] = useState('');
  const [items, setItems] = useState([]);
  const departments = ['Engineering', 'Product']; // TODO: fetch from API
  const teams = ['Team A', 'Team B']; // TODO: fetch from API

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
      <ColorLegend />
      <ul>
        {items.map(item => (
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
