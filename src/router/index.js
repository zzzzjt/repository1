const App = () => import('view/login');

// mode: 'history',
const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  }
];

export default routes;
