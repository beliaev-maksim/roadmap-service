import React from 'react';

export default function DepartmentTeamFilter({ departments, teams, onDepartmentChange, onTeamChange }) {
  return (
    <div>
      <label htmlFor="department-filter">Department:</label>
      <select id="department-filter" onChange={e => onDepartmentChange(e.target.value)}>
        <option value="">All</option>
        {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
      </select>
      <label htmlFor="team-filter">Team:</label>
      <select id="team-filter" onChange={e => onTeamChange(e.target.value)}>
        <option value="">All</option>
        {teams.map(team => <option key={team} value={team}>{team}</option>)}
      </select>
    </div>
  );
}
