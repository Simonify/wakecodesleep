import React, { Component, PropTypes, cloneElement } from 'react';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import About from 'components/about';
import posts from 'posts/index';

var styles;

@Radium
export default class App extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    children: PropTypes.node
  };

  static childContextTypes = {
    config: PropTypes.object.isRequired
  };

  getChildContext = () => ({ config: this.props.config });

  render() {
    return (
      <div className="app" style={styles.component} onWheel={this._onWheel}>
        <div style={styles.frame}>
          <About />
          <div style={styles.content}>
            <DocumentTitle title={this.props.config.title}>
              {cloneElement(this.props.children, { ref: this._setChildRef })}
            </DocumentTitle>
          </div>
        </div>
      </div>
    );
  }

  _setChildRef = (ref) => {
    this._childRef = ref;
  };

  _onWheel = (event) => {
    event.preventDefault();

    if (typeof this._childRef === 'object') {
      if (typeof this._childRef.scroll === 'function') {
        this._childRef.scroll(event.deltaY);
      }
    }
  };
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
    overflow: `hidden`,
    '@media (max-width: 720px)': {
      flexDirection: `column`
    }
  },
  content: {
    display: `flex`,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: `#FFFFFF`,
    overflow: `hidden`
  }
}
