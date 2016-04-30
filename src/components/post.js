import React, { Component, PropTypes, cloneElement, isValidElement } from 'react';
import pureRender from 'pure-render-decorator';
import Radium from 'radium';
import { Link } from 'react-router';
import { highlight } from 'highlight.js';
import Highlight from 'react-highlight';
import moment from 'moment';
import marked, { Renderer } from 'marked';
import { LINK } from 'posts/constants';

const renderer = new Renderer();

renderer.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a target="_blank" rel="nofollow" href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

renderer.code = function (code, lang, escaped ) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre class="hljs"><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre class="hljs"><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

var styles;

@Radium
export default class Post extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
    created_at: PropTypes.object.isRequired,
    tag: PropTypes.string
  };

  render() {
    return (
      <div className="post-component has-font" style={styles.component}>
        <Link to={`/posts/${this.props.slug}.html`} style={styles.title}>
          {this.props.title}
        </Link>
        <div style={styles.meta}>
          {moment(this.props.created_at).format('MMMM Do YYYY')}
        </div>
        <div className="body">
          {this.renderPost()}
        </div>
      </div>
    );
  }

  renderPost(content = this.props.content) {
    if (this.props.tag === LINK && typeof this.props.url === 'string') {
      return this.renderLink(this.props.url);
    }

    if (typeof content === 'function') {
      return this.renderPost(content(this.props));
    }

    if (!Array.isArray(content)) {
      return this.renderPost([content]);
    }

    return content.map((content, index) => {
      if (typeof content === 'string') {
        return this.renderString(content, index);
      }

      if (typeof content === 'object') {
        if (content.type === 'image') {
          return this.renderImage(content, index);
        }

        if (isValidElement(content)) {
          return this.renderReact(content, index);
        }

        if (typeof content.toString === 'function') {
          return this.renderCode(content.toString(), index);
        }
      }

      return null;
    });
  }

  renderLink(url) {
    return (
      <a href={url} style={styles.link} target="_blank" rel="nofollow">
        {url}
      </a>
    );
  }

  renderString(text, key) {
    const __html = marked(text, {
      renderer,
      highlight: (code, lang) => highlight(lang, code).value
    });

    return (
      <div key={key} style={styles.text} dangerouslySetInnerHTML={{ __html }} />
    )
  }

  renderImage({ cover, src, width, height }, key) {
    if (cover) {
      const style = [
        styles.cover,
        { backgroundImage: `url('${src}')`, width, height }
      ];

      return (<div key={key} style={style} />);
    }

    return (<img key={key} style={styles.image} src={src} width={width} height={height} />);
  }

  renderReact(element, key) {
    return cloneElement(element, { key });
  }

  renderCode(code, key) {
    return this.renderString('```js\n' + code + '\n```');
  }
}

styles = {
  component: {
    width: `100%`,
    flexGrow: 1,
    flexShrink: 1,
    wordBreak: `break-word`
  },
  title: {
    fontFamily: `"proxima-nova", "Helvetica Neue", Helvetica, Arial`,
    fontSize: 26,
    textDecoration: `none`,
    color: `#333333`
  },
  meta: {
    fontFamily: `"proxima-nova", "Helvetica Neue", Helvetica, Arial`,
    fontSize: 14,
    color: `#919191`
  },
  text: {
    marginTop: 20,
    fontSize: 17
  },
  image: {
    marginTop: 20,
    maxWidth: `100%`,
    borderRadius: 2,
    overflow: `hidden`
  },
  cover: {
    marginTop: 20,
    backgroundPosition: `50% 50%`,
    backgroundSize: `cover`,
    borderRadius: 2
  },
  link: {
    transition: `border-bottom-color 250ms ease`,
    display: `inline-flex`,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomStyle: `solid`,
    borderBottomColor: `transparent`,
    fontSize: 18,
    textDecoration: `none`,
    color: `#76736E`,
    ':hover': {
      borderBottomColor: `#76736E`
    }
  }
};
