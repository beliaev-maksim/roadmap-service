import React from 'react';

export default function DepartmentTeamFilter({ departments, teams, onDepartmentChange, onTeamChange }) {
  return (
    <div>
      <label>Department:</label>
      <select onChange={e => onDepartmentChange(e.target.value)}>
        <option value="">All</option>
        {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
      </select>
      <label>Team:</label>
      <select onChange={e => onTeamChange(e.target.value)}>
        <option value="">All</option>
        {teams.map(team => <option key={team} value={team}>{team}</option>)}
      </select>
    </div>
  );
}
