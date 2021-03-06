import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import Radium from 'radium';
import moment from 'moment';
import Post from './post';

const RadiumLink = Radium(Link);

var styles;

@Radium
export default class Index extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired
  };

  scroll(delta) {
    findDOMNode(this).scrollTop += delta;
  }

  render() {
    const { posts } = this.props.route;

    return (
      <div className="index" style={styles.component} onScroll={this.props.onScroll}>
        {posts.map(this.renderPost)}
      </div>
    );
  }

  renderPost = (post, index, posts) => {
    if (post.draft) {
      return null;
    }

    let tag;

    if (post.tag) {
      const tagStyle = post.tag.toLowerCase().replace(/[^A-Za-z_-]+/, '');

      tag = {
        label: post.tag,
        style: [styles.tag, styles.tags[tagStyle] && styles.tags[tagStyle]]
      };
    }

    const lastChild = index === posts.length - 1;

    return (
      <RadiumLink
        key={post.slug}
        className="has-font"
        style={[styles.post, lastChild && styles.lastPost]}
        onMouseDown={this._onMouseDown}
        to={`/posts/${post.slug}.html`}
      >
        <div style={styles.titleRow}>
          {tag ? (
            <div style={tag.style}>
              {tag.label}
            </div>
          ) : null}
          <div style={styles.title}>
            {post.title}
          </div>
        </div>
        <div style={styles.meta}>
          {moment(post.created_at).format('MMMM Do YYYY')}
        </div>
      </RadiumLink>
    );
  };

  /**
   * Fixes Radium's weird active state bug.
   */
  _onMouseDown = (e) => e.preventDefault();
}

styles = {
  component: {
    display: `flex`,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: `column`,
    overflow: `auto`,
    WebkitOverflowScrolling: `touch`
  },
  intro: {
    paddingBottom: 10,
    fontSize: 21
  },
  post: {
    display: `flex`,
    width: `100%`,
    padding: 25,
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: `column`,
    fontFamily: `"proxima-nova", Helvetica, Arial`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    borderBottom: `1px solid rgba(0,0,0,0.1)`,
    textDecoration: `none`,
    color: `#333333`,
    ':hover': {
      background: `rgba(0,0,0,.02)`
    },
    ':active': {
      background: `rgba(0,0,0,.05)`
    }
  },
  lastPost: {
    // borderBottom: `none`
  },
  titleRow: {
    display: `flex`,
    width: `100%`,
    flexDirection: `row`,
    alignItems: `center`,
    whiteSpace: `nowrap`
  },
  tag: {
    display: `flex`,
    marginRight: 8,
    padding: `2px 6px`,
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: `16px`
  },
  tags: {
    link: {
      background: `#5E5E5E`,
      color: `#FFFFFF`
    },
    opensource: {
      background: `#5E5E5E`,
      color: `#FFFFFF`
    }
  },
  title: {
    flexGrow: 0,
    flexShrink: 1,
    fontSize: 18,
    fontWeight: 500,
    textOverflow: `ellipsis`,
    overflow: `hidden`
  },
  meta: {
    marginTop: 5,
    fontSize: 14,
    color: `rgba(0,0,0,0.5)`
  }
}
