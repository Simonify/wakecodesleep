import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
  render() {
    return (
      <html id="sf-html">
        <head>
          <title>Simon Fletcher</title>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8"/>
          <link href="/styles.css" rel="stylesheet" />
        </head>
        <body id="sf-body">
          <div id="sf" dangerouslySetInnerHTML={{__html: this.props.children }} />
          <script src={process.env.NODE_ENV === 'production' ? '/bundle.js' : '/app.js'}/>
          <script src="https://use.typekit.net/dgu0vfk.js"></script>
          <script dangerouslySetInnerHTML={{
            __html: 'try{Typekit.load({ async: true });}catch(e){}'
          }} />
        </body>
      </html>
    );
  }
}
