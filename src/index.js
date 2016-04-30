require('./styles/index.css');

import React from 'react';
import { render } from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StyleRoot } from 'radium';
import { RouterContext, match, browserHistory, createMemoryHistory } from 'react-router';
import { router, routes } from 'router';
import Html from 'components/html';

export default ({ assets, path }) => {
  const history = createMemoryHistory();
  const location = history.createLocation(path);

  return new Promise((resolve) => {
    match({ history, location, routes }, (error, redirectLocation, renderProps) => {
      resolve('<!doctype html>' + renderToString(
        <Html assets={assets}>
          {renderToStaticMarkup((
            <StyleRoot>
              <RouterContext {...renderProps} />
            </StyleRoot>
          ))}
        </Html>
      ));
    });
  });
}

if (typeof document !== 'undefined') {
  render((<StyleRoot>{router}</StyleRoot>), document.getElementById('sf'));
}
