import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

const RadiumLink = Radium(Link);

var styles;

@Radium
export default class Footer extends Component {
  static propTypes = {
    siblings: PropTypes.object
  };

  render() {
    let footer;

    if (typeof this.props.siblings !== 'undefined') {
      footer = this.renderSiblings(this.props.siblings);
    }

    return footer ? (
      <div style={styles.component}>
        {footer}
      </div>
    ) : null;
  }

  renderSiblings({ previous, next}) {
    if (!previous && !next) {
      return null;
    }

    return (
      <div style={styles.siblings.component}>
        <div style={styles.siblings.previous}>
          {previous ? (
            <RadiumLink to={`/posts/${previous.slug}.html`} style={styles.button}>
              <span style={[styles.siblings.arrow, { marginRight: 5 }]}>&laquo;</span>
              <span style={styles.buttonText}>{previous.title}</span>
            </RadiumLink>
          ) : null}
        </div>
        <div style={styles.siblings.next}>
          {next ? (
            <RadiumLink to={`/posts/${next.slug}.html`} style={styles.button}>
              <span style={styles.buttonText}>{next.title}</span>
              <span style={[styles.siblings.arrow, { marginLeft: 5 }]}>
                &raquo;
              </span>
            </RadiumLink>
          ) : null}
        </div>
      </div>
    );
  }
}

styles = {
  component: {
    width: `100%`,
    flexGrow: 0,
    flexShrink: 0,
    padding: `20px 25px`,
    backgroundColor: `#F3F3F3`,
    overflow: `hidden`
  },
  button: {
    transition: `background-color 250ms ease, border-color 250ms ease, color 250ms ease`,
    position: `relative`,
    display: `inline-flex`,
    padding: `10px 16px`,
    flexGrow: 0,
    flexShrink: 1,
    borderWidth: 2,
    borderStyle: `solid`,
    borderColor: `rgba(0,0,0,0.35)`,
    borderRadius: 30,
    fontSize: 16,
    lineHeight: `18px`,
    fontWeight: 600,
    color: `rgba(0,0,0,0.35)`,
    textDecoration: `none`,
    whiteSpace: `nowrap`,
    overflow: `hidden`,
    ':hover': {
      color: `#FF5A4F`,
      borderColor: `#FF5A4F`
    },
    ':active': {
      color: `#FFFFFF`,
      backgroundColor: `#FF5A4F`
    }
  },
  buttonText: {
    textOverflow: `ellipsis`,
    overflow: `hidden`
  },
  siblings: {
    component: {
      display: `flex`,
      flexDirection: `row`,
      justifyContent: `space-between`,
      alignItems: `center`,
      overflow: `hidden`
    },
    previous: {
      display: `flex`,
      padding: `0 10px 0 0`,
      flexGrow: 1,
      flexShrink: 1,
      justifyContent: `flex-start`,
      overflow: `hidden`
    },
    next: {
      display: `flex`,
      padding: `0 0 0 10px`,
      flexGrow: 1,
      flexShrink: 1,
      justifyContent: `flex-end`,
      overflow: `hidden`
    },
    arrow: {
      fontSize: 18,
      lineHeight: `14px`
    }
  }
}
