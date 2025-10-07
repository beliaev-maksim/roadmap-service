import App from './App';
import AdminRoadmapView from './pages/admin/AdminRoadmapView';
// TODO: Add user/admin route components and role-based routing

const routes = [
  { path: '/', component: RoadmapView },
  { path: '/admin', component: AdminRoadmapView, role: 'admin' },
];
