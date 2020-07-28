import { data } from 'autoprefixer';

const App = () => import('view/login');
const information = () => import('view/information');

// mode: 'history',
const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/information',
    name: 'information',
    component: information
  }
];

export default routes;
