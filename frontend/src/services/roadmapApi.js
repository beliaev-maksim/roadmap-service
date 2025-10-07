export async function fetchRoadmap({ department, team }) {
  const params = new URLSearchParams();
  if (department) params.append('department', department);
  if (team) params.append('team', team);
  const res = await fetch(`/roadmap?${params.toString()}`);
  return res.json();
}
