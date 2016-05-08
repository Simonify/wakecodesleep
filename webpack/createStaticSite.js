import path from 'path';
import evaluate from 'eval';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { createSitemap } from 'sitemap';
import Html from 'components/html';
import getRoutes from 'router/getRoutes';

export const ENTRY = `blog-${Date.now()}`;

const createAsset = (src, length = src.length) => ({
  source: () => src,
  size: () => length
});

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

export default function createStaticSite(config) {
  function sitemap(routes) {
    return createSitemap({
      hostname: config.hostname,
      urls: routes.map(({ path }) => ({
        url: path,
        changefreq: 'weekly',
        priority: path === '/' ? 1 : 0.8
      }))
    }).toXML();
  }

  function development({ compiler, assets, routes, done }) {
    const app = '<!doctype html>' + renderToStaticMarkup(<Html assets={assets} />);
    compiler.assets['index.html'] = createAsset(app);
    compiler.assets['sitemap.xml'] = sitemap(routes);

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

    compiler.assets['sitemap.xml'] = createAsset(sitemap(routes));

    const promises = routes.map(({ path: _path }) => {
      let filename = _path.replace(/^(\/|\\)/, '');

      if (!/\.(html?)$/i.test(filename)) {
        filename = path.join(filename, 'index.html');
      }

      return render({ path: _path, assets }).then((res) => {
        compiler.assets[filename] = createAsset(res);
      }).catch((err) => {
        compiler.errors.push(err.stack);
      });
    });

    Promise.all(promises).then(() => {
      done();
    }).catch((err) => {
      console.log('uh', err);
    });
  }

  function apply(webpack) {
    webpack.plugin('emit', (compiler, done) => {
      const posts = require('../posts').default;
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
