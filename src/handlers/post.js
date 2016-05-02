import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import Post from 'components/post';
import Footer from 'components/footer';
import getPostSiblings from 'fn/getPostSiblings';

var styles;

@Radium
export default class PostHandler extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
  };

  scroll(delta) {
    findDOMNode(this).scrollTop += delta;
  }

  componentDidUpdate(props) {
    if (this.props.route.post !== props.route.post) {
      findDOMNode(this).scrollTop = 0;
    }
  }

  render() {
    const { post, posts } = this.props.route;

    return (
      <DocumentTitle title={`${post.title} - ${this.props.config.title}`}>
        <div style={styles.component}>
          <div style={styles.post}>
            <Post {...post} />
          </div>
          <Footer siblings={getPostSiblings(posts, post)} />
        </div>
      </DocumentTitle>
    );
  }
}

styles = {
  component: {
    display: `flex`,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: `column`,
    alignItems: `flex-start`,
    overflow: `auto`,
    WebkitOverflowScrolling: `touch`
  },
  post: {
    display: `flex`,
    width: `100%`,
    padding: 35,
    flexGrow: 1,
    flexShrink: 0,
    alignItems: `flex-start`,
  }
};
