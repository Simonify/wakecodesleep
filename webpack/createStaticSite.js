import path from 'path';
import evaluate from 'eval';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Html from 'components/html';
import getRoutes from 'router/getRoutes';

export const ENTRY = `blog-${Date.now()}`;

const createAssetFromContents = (src, length = src.length) => ({
  source: () => src,
  size: () => length
});

function getAssetsFromCompiler(compiler, webpackStatsJson) {
  const assets = {};

  for (const chunk of Object.keys(webpackStatsJson.assetsByChunkName)) {
    let chunkValue = webpackStatsJson.assetsByChunkName[chunk];

    // Webpack outputs an array for each chunk when using sourcemaps
    if (chunkValue instanceof Array) {
      // Is the main bundle always the first element?
      chunkValue = chunkValue[0];
    }

    if (compiler.options.output.publicPath) {
      chunkValue = compiler.options.output.publicPath + chunkValue;
    }

    assets[chunk] = chunkValue;
  }

  return assets;
}

const getAssets = (compiler, chunks) => chunks.reduce((assets, chunk) => {
  let chunkFiles = [...chunk.files];

  if (compiler.options.output.publicPath) {
    const { publicPath } = compiler.options.output;
    chunkFiles = chunkFiles.map((chunkFile) => publicPath + chunkFile);
  }

  assets.js.push(chunkFiles[0]);

  chunkFiles.forEach((chunkFile) => {
    if (/.css($|\?)/.test(chunkFile)) {
      if (!assets.css.includes(chunkFile)) {
        assets.css.push(chunkFile);
      }
    }
  });

  return assets;
}, { js: [], css: [] });

export default function createStaticSite() {
  function development({ compiler, assets, routes, done }) {
    const app = '<!doctype html>' + renderToStaticMarkup(<Html assets={assets} />);
    compiler.assets['index.html'] = createAssetFromContents(app);

    /**
     * webpack didnt want to route URLs containing periods so do this for now
     */
    routes.map(({ path }) => {
      if (path !== '/') {
        compiler.assets[path] = compiler.assets['index.html'];
      }
    });

    done();
  }

  function production({ compiler, stats, assets, done, routes }) {
    const assetPath = stats.assetsByChunkName[ENTRY][0];
    const asset = compiler.assets[assetPath];
    const source = asset.source();

    let render = evaluate(source, 'blog.js', undefined, true);

    if (render.hasOwnProperty('__esModule')) {
      render = render['default'];
    }

    const promises = routes.map(({ path: _path }) => {
      let filename = _path.replace(/^(\/|\\)/, ''); // Remove leading slashes for webpack-dev-server

      if (!/\.(html?)$/i.test(filename)) {
        filename = path.join(filename, 'index.html');
      }

      return render({ path: _path, assets }).then((res) => {
        compiler.assets[filename] = createAssetFromContents(res);
      }).catch((err) => {
        compiler.errors.push(err.stack);
      });
    });

    Promise.all(promises).then(() => done()).catch((err) => {
      console.log('uh', err);
    });
  }

  function apply(webpack) {
    webpack.plugin('emit', (compiler, done) => {
      const posts = require('posts').default;
      const routes = getRoutes(posts);
      const stats = compiler.getStats();
      const statsJson = stats.toJson();
      const assets = getAssets(compiler, statsJson.chunks);

      if (process.env.NODE_ENV === 'development') {
        return development({ compiler, stats: statsJson, assets, done, routes });
      }

      return production({ compiler, stats: statsJson, assets, done, routes });
    });
  }

  return { apply };
}
