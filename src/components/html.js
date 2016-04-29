import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
  render() {
    return (
      <html id="sf-html">
        <head>
          <title>Simon Fletcher</title>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8"/>
          <link rel="shortcut icon" href="http://66.media.tumblr.com/avatar_1dbc1bcdaa9e_128.png" />
          <link href="/styles.css" rel="stylesheet" />
        </head>
        <body id="sf-body">
          <div id="sf" dangerouslySetInnerHTML={{__html: this.props.children }} />
          <script src={process.env.NODE_ENV === 'production' ? '/bundle.js' : '/app.js'}/>
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
