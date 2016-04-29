import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';
import { Link } from 'react-router';
import twitter from 'dist/images/twitter-white.png';
import email from 'dist/images/email-white.png';
import instagram from 'dist/images/instagram-white.png';
import facebook from 'dist/images/facebook.png';

var styles;

@Radium
export default class About extends Component {
  render() {
    return (
      <div style={styles.component}>
        <div style={styles.top}>
          <Link to="/" style={styles.h1}>Hi, I'm Simon.</Link>
          <p style={styles.about}>
            {`Simon Fletcher is a 23 year old British software engineer currently
              working with JavaScript at `}
            <a key="mbx" href="https://minbox.com" style={styles.link} target="_blank">
              Minbox
            </a>.
          </p>
          <p style={styles.about}>
            {'Previously, he was a founder at Y Combinator funded '}
            <span style={styles.highlight}>Interstate</span>
            {' (acquired by Stripe).'}
          </p>
        </div>
        <div style={styles.bottom}>
          <div style={styles.social}>
            <a
              key="twitter"
              href="https://www.twitter.com/simonify"
              style={styles.socialLink}
              target="_blank"
            >
              <img src={twitter} width={36} height={28} style={styles.socialIcon} />
            </a>
            <a
              key="instagram"
              href="https://www.instagram.com/simonandrewfletcher"
              style={styles.socialLink}
              target="_blank"
            >
              <img src={instagram} width={28} height={28} style={styles.socialIcon} />
            </a>
            <a
              key="facebook"
              href="https://www.facebook.com/simonandrewfletcher"
              style={[styles.socialLink, { width: 35 }]}
              target="_blank"
            >
              <img src={facebook} width={14} height={28} style={styles.socialIcon} />
            </a>
            <a
              key="email"
              href="mailto:simon@wakecodesleep.com"
              style={styles.socialLink}
            >
              <img src={email} width={28} height={28} style={styles.socialIcon} />
            </a>
          </div>
          <div style={styles.established}>
            ESTABLISHED 1992
          </div>
        </div>
      </div>
    );
  }
}

styles = {
  component: {
    display: `flex`,
    width: 345,
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: `rgba(77, 71, 83, 0.8)`,
    // backgroundImage: `linear-gradient(-180deg, rgba(32, 32, 32, 0.8) 0%, #000000 100%)`,
    flexDirection: `column`
  },
  top: {
    padding: `35px 35px`,
    flexGrow: 1,
    flexShrink: 1,
    overflow: `auto`,
  },
  bottom: {
    display: `flex`,
    padding: `50px 35px 0 35px`,
    maxHeight: 200,
    flexDirection: `column`,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: `flex-end`
  },
  h1: {
    margin: 0,
    padding: 0,
    fontSize: 34,
    fontWeight: 300,
    lineHeight: `34px`,
    textDecoration: `none`,
    color: `#FFFFFF`
  },
  about: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 300,
    color: `rgba(255, 255, 255, 0.5)`
  },
  link: {
    transition: `border-bottom-color 250ms ease`,
    borderBottomWidth: 1,
    borderBottomStyle: `solid`,
    borderBottomColor: `transparent`,
    color: `rgba(255, 255, 255, 1)`,
    textDecoration: `none`,
    ':hover': {
      borderBottomColor: `rgba(255, 255, 255, 0.8)`
    }
  },
  highlight: {
    color: `rgba(255, 255, 255, 0.8)`
  },
  social: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `flex-end`
  },
  socialLink: {
    transition: `opacity 250ms ease`,
    justifyContent: `center`,
    alignItems: `center`,
    textAlign: `center`,
    opacity: 0.5,
    ':hover': {
      opacity: 1
    }
  },
  socialIcon: {
    verticalAlign: `middle`
  },
  established: {
    padding: `25px 0`,
    fontFamily: `"proxima-nova", Helvetica, Arial`,
    fontSize: 11,
    fontWeight: 600,
    textTransform: `uppercase`,
    color: `rgba(255, 255, 255, 0.3)`,
    justifyContent: `center`,
    alignItems: `center`,
    textAlign: `center`
  }
};
