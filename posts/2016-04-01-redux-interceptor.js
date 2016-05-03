import { js } from 'posts/tags';

export default {
  title: "Rendering asynchronous React components with redux-interceptor",
  content: [
    `Rendering a React component on the server often requires asynchronously fetching any data which the component or any of its children require. If you're using Redux to store *and* fetch your data, you can easily solve this problem through a small piece of middleware. The trade-off with using this method is that you will suffer the slight performance penalty of rendering your React application twice but this shouldn't be a problem for most applications.`,

    `The middleware we'll use to solve this problem, [redux-interceptor](http://github.com/simonify/redux-interceptor), intercepts and records any store actions that are dispatched so that they can be executed in a single batch at a later time. We can take advantage of the middleware by placing all essential data fetching in the \`componentWillMount\` lifecycle method. This method is called during both client *and* server renders which means on the server, you're able to capture all the necessary actions your component tree requires, wait until they resolve and then re-render your application with a hydrated store.`,

    `I've published the middleware on GitHub: http://github.com/simonify/redux-interceptor and you can install it via \`npm install react-interceptor --save\`.`,

    `Here's an example of how to use it:`,

    js`import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import { applyMiddleware, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import createInterceptor from 'redux-interceptor';

const FETCH_RANDOM = 'example/FETCH_RANDOM';
const SET_RANDOM = 'example/SET_RANDOM';

const fetchRandom = () => dispatch => {
  dispatch({ type: FETCH_RANDOM });

  return new Promise((resolve) => setTimeout(() => resolve(dispatch({
    type: SET_RANDOM,
    payload: Math.random()
  })), 2500));
}

function reducer(state = { fetching: false, random: null }, action) {
  switch (action.type) {
    case FETCH_RANDOM:
      return { ...state, fetching: true, random: null };
    case SET_RANDOM:
      return { ...state, fetching: false, random: action.payload };
    default:
      return state;
  }
}

class App extends Component {
  static propTypes = {
    fetchRandom: PropTypes.func.isRequired,
    random: PropTypes.number
  };

  componentWillMount() {
    if (!this.props.random) {
      this.props.fetchRandom();
    }
  }

  render() {
    return (<div>{this.props.random ? this.props.random : 'Loading...'}</div>);
  }
}

const interceptor = createInterceptor();
const store = createStore(reducer, applyMiddleware(interceptor, thunk));
const ConnectedApp = connect(({ random }) => ({ random }), { fetchRandom })(App);
const render = () => renderToString((
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
));

// <div data-reactroot="" data-reactid="1" data-react-checksum="622727842">Loading...</div>
console.log(render());

// <div data-reactroot="" data-reactid="1" data-react-checksum="-1584000246">0.9193182914256697</div>
interceptor.resolve().then(render).then(::console.log);`
  ],
  slug: "2016-04-01-redux-interceptor",
  created_at: new Date("2016-05-03T06:18:20.688Z")
}
