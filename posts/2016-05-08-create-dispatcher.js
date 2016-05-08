import { js } from 'posts/tags';

export default {
  title: "create-dispatcher: A simple, minimal event dispatcher",
  content: [
    'There is a simple event dispatcher pattern which I often find myself reimplementing across different projects so I decided to extract out a common implementation in to a module: [create-dispatcher](https://github.com/Simonify/create-dispatcher).',

    'The module exports a single function `createDispatcher` which, when called, returns three methods: `destroy`, `dispatch` and `subscribe`. In the most simplest use case, you can call `subscribe` with a function that will be called whenever events are dispatched with `dispatch`:',

    js`import createDispatcher from 'create-dispatcher';

const { dispatch, subscribe } = createDispatcher();

const unsubscribe = subscribe(::console.log); // {"type":"helllo"}

dispatch({ type: 'hello' });

unsubscribe();`,

    'You can install the module via `npm install create-dispatch --save` and the source code/documentation is available on GitHub at https://github.com/Simonify/create-dispatcher.'
  ],
  slug: "2016-05-08-create-dispatcher",
  tag: 'Open Source',
  created_at: new Date("2016-05-08T16:26:19.178Z")
}
