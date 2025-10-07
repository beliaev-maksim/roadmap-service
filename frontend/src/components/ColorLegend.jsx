import React from 'react';
export default function ColorLegend() {
  return (
    <div>
      <h3>Epic Health Color Legend</h3>
      <ul>
        <li style={{color: 'purple'}}>Purple: Carry-over from previous cycles</li>
        <li style={{color: 'green'}}>Green: Done (C), In Progress, In Review, To Be Deployed, BLOCKED</li>
        <li style={{color: 'orange'}}>Orange: At Risk</li>
        <li style={{color: 'red'}}>Red: Excluded, Rejected</li>
        <li style={{color: 'blue'}}>Blue: Added</li>
        <li style={{color: 'black'}}>Black: Dropped</li>
        <li style={{color: 'white'}}>White: Other statuses</li>
      </ul>
    </div>
  );
}
