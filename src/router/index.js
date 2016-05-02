import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import App from 'handlers/app';
import getRoutes from './getRoutes';
import posts from '../../posts';

const routeComponents = getRoutes(posts).map((route) => {
  const props = {
    ...route.props,
    key: route.path,
    path: route.path.slice(1),
    component: route.component
  };

  return route.index ? (<IndexRoute {...props} />) : (<Route {...props}/>);
});

export const routes = (
  <Route path="/" component={App}>
    {routeComponents}
  </Route>
);

export default function createRouter(props) {
  return (
    <Router history={browserHistory} {...props}>
      {routes}
    </Router>
  );
}
