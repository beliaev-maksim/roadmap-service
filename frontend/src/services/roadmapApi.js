const API_URL = process.env.REACT_APP_API_URL || '';
const BASE_URL = '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error(`Network response was not ok. Status: ${response.status}`);
  }
  
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  
  throw new Error(`Expected JSON response, but got ${contentType}`);
};

export async function fetchRoadmap({ department, team }) {
  const params = new URLSearchParams();
  if (department) params.append('department', department);
  if (team) params.append('team', team);
  const url = `${API_URL}/roadmap?${params.toString()}`;
  const res = await fetch(url);
  return res.json();
}

export const getRoadmapData = async () => {
  return handleResponse(await fetch(`${BASE_URL}/roadmap`));
};

export const getSyncStatus = async () => {
  return handleResponse(await fetch(`${BASE_URL}/status`));
};
