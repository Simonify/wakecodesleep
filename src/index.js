require('./styles/index.css');

import React from 'react';
import { render } from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StyleRoot } from 'radium';
import { RouterContext, match, browserHistory, createMemoryHistory } from 'react-router';
import { router, routes } from 'router';
import Html from 'components/html';

module.exports = ({ assets, path }, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(path);

  match({ history, location, routes }, (error, redirectLocation, renderProps) => {
    callback(null, '<!doctype html>' + renderToString(
      <Html assets={assets}>
        {renderToStaticMarkup((
          <StyleRoot>
            <RouterContext {...renderProps} />
          </StyleRoot>
        ))}
      </Html>
    ));
  });
}

if (typeof document !== 'undefined') {
  render((<StyleRoot>{router}</StyleRoot>), document.getElementById('sf'));
}
