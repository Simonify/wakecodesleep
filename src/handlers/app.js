import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import About from 'components/about';
import posts from 'posts/index';

var styles;

export default class App extends Component {
  render() {
    return (
      <div className="app" style={styles.component}>
        <div style={styles.frame}>
          <About />
          <div style={styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

styles = {
  component: {
    display: `flex`,
    backgroundColor: `#FFDA93`,
    backgroundImage: `url(${require('dist/images/nyc.jpg')})`,
    backgroundPosition: `50% 50%`,
    backgroundSize: `cover`,
    width: `100%`,
    height: `100%`,
    flexGrow: 1,
    flexShrink: 1,
    padding: 50
  },
  frame: {
    display: `flex`,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: `row`,
    boxShadow: `0px 5px 14px 0px rgba(0,0,0,0.30)`,
    borderRadius: 6,
    overflow: `hidden`
  },
  content: {
    display: `flex`,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: `#FFFFFF`,
    overflow: `hidden`
  }
}
