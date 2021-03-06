import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';
import { Link } from 'react-router';
import twitter from 'dist/images/twitter-white.png';
import email from 'dist/images/email-white.png';
import instagram from 'dist/images/instagram-white.png';
import facebook from 'dist/images/facebook.png';

const RadiumLink = Radium(Link);

var styles;

@Radium
export default class About extends Component {
  render() {
    return (
      <div style={styles.component}>
        <div style={styles.top}>
          <RadiumLink className="has-font" style={styles.h1} to="/">
            Hi, I'm Simon.
          </RadiumLink>
          <p className="has-font" style={styles.about}>
            {`Simon Fletcher is a 24 year old British software engineer currently
              working with JavaScript at `}
            <a key="mbx" href="https://minbox.com" style={styles.link} target="_blank">
              Minbox
            </a> in San Francisco, CA.
          </p>
          <p className="has-font" style={[styles.about, styles.history]}>
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
          <div className="has-font" style={styles.established}>
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
    flexDirection: `column`,
    '@media (max-width: 720px)': {
      width: `auto`,
      flexDirection: `row`
    }
  },
  top: {
    padding: `35px 35px`,
    flexGrow: 1,
    flexShrink: 1,
    overflow: `auto`,
    '@media (max-width: 720px)': {
      paddingRight: 0
    },
    '@media (max-width: 600px)': {
      paddingRight: 35
    }
  },
  bottom: {
    display: `flex`,
    padding: `50px 35px 0 35px`,
    maxHeight: 200,
    flexDirection: `column`,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: `flex-end`,
    '@media (max-width: 720px)': {
      padding: 20,
      maxHeight: `auto`,
      alignItems: `center`,
      justifyContent: `center`
    },
    '@media (max-width: 600px)': {
      display: `none`
    }
  },
  h1: {
    transition: `border-bottom-color 250ms ease`,
    margin: 0,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomStyle: `solid`,
    borderBottomColor: `transparent`,
    fontSize: 34,
    fontWeight: 300,
    lineHeight: `34px`,
    textDecoration: `none`,
    color: `#FFFFFF`,
    '@media (min-width: 720px)': {
      ':hover': {
        borderBottomColor: `rgba(255, 255, 255, 0.25)`
      },
    }
  },
  about: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 300,
    color: `rgba(255, 255, 255, 0.6)`,
    '@media (max-width: 720px)': {
      marginTop: 5
    }
  },
  history: {
    '@media (max-width: 720px)': {
      display: `none`
    }
  },
  link: {
    transition: `border-bottom-color 250ms ease`,
    borderBottomWidth: 1,
    borderBottomStyle: `solid`,
    borderBottomColor: `transparent`,
    textDecoration: `none`,
    color: `rgba(255, 255, 255, 1)`,
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
    outline: `none`,
    opacity: 0.5,
    ':hover': {
      opacity: 1
    },
    '@media (max-width: 720px)': {
      marginRight: 15
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
    textAlign: `center`,
    '@media (max-width: 720px)': {
      display: `none`
    }
  }
};
