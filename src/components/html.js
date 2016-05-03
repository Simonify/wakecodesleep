import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  render() {
    let js;
    let css;

    if (typeof this.props.assets === 'object') {
      js = this.props.assets.js;
      css = this.props.assets.css;
    }

    return (
      <html id="sf-html">
        <head>
          <title>{this.props.title}</title>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="initial-scale=0.75" />
          <link rel="shortcut icon" href="http://66.media.tumblr.com/avatar_1dbc1bcdaa9e_128.png" />
          {css && css.map((src) => (<link key={src} rel="stylesheet" href={src} />))}
        </head>
        <body id="sf-body">
          <div id="sf" dangerouslySetInnerHTML={{__html: this.props.children }} />
          {js && js.map((src) => (<script key={src} src={src} />))}
          <script src="https://use.typekit.net/dgu0vfk.js"></script>
          <script dangerouslySetInnerHTML={{
            __html: 'try{Typekit.load({ async: true });}catch(e){}'
          }} />
          <script type="text/javascript" dangerouslySetInnerHTML={{
            __html: `var _gauges = _gauges || [];
            (function() {
              var t   = document.createElement('script');
              t.type  = 'text/javascript';
              t.async = true;
              t.id    = 'gauges-tracker';
              t.setAttribute('data-site-id', '4f13d421613f5d4519000001');
              t.setAttribute('data-track-path', 'https://track.gaug.es/track.gif');
              t.src = 'https://d36ee2fcip1434.cloudfront.net/track.js';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(t, s);
            })();` }} />
        </body>
      </html>
    );
  }
}
