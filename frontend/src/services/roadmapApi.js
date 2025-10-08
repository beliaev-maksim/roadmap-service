
const API_URL = process.env.REACT_APP_API_URL || '';

export async function fetchRoadmap({ department, team }) {
  const params = new URLSearchParams();
  if (department) params.append('department', department);
  if (team) params.append('team', team);
  const url = `${API_URL}/roadmap?${params.toString()}`;
  const res = await fetch(url);
  return res.json();
}
