require('./styles/index.css');

import React, { createElement as originalCreateElemet } from 'react';
import DocumentTitle from 'react-document-title';
import { render } from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StyleRoot } from 'radium';
import { RouterContext, match, browserHistory, createMemoryHistory } from 'react-router';
import createRouter, { routes } from 'router';
import Html from 'components/html';
import config from '../config';

const createElement = (element, props) => originalCreateElemet(element, { ...props, config });

export default ({ assets, path }) => {
  const history = createMemoryHistory();
  const location = history.createLocation(path);

  return new Promise((resolve) => {
    match({ history, location, routes }, (error, redirectLocation, renderProps) => {
      const html = renderToStaticMarkup((
        <StyleRoot>
          <RouterContext {...renderProps} createElement={createElement} />
        </StyleRoot>
      ));

      const title = DocumentTitle.rewind();

      resolve('<!doctype html>' + renderToString(
        <Html assets={assets} title={title}>
          {html}
        </Html>
      ));
    });
  });
}

if (typeof document !== 'undefined') {
  render((
    <StyleRoot>
      {createRouter({ createElement })}
    </StyleRoot>
  ), document.getElementById('sf'));
}
