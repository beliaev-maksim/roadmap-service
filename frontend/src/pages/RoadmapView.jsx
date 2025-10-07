import React, { useState, useEffect } from 'react';
import DepartmentTeamFilter from '../components/DepartmentTeamFilter';
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
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} ({item.department}/{item.team})</li>
        ))}
      </ul>
    </div>
  );
}
