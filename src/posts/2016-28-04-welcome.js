import { js } from './tags';

export default {
  content: [
    js`export default function wakecodesleep() {
  return 'Welcome to my new blog!';
}`,
    `After turning off my blog several years ago, I've decided to create a new one as a place to share any thoughts that I have during the day, interesting snippets of code and useful links which I discover. I also decided to re-invent the wheel rather than use an existing platform such as Medium or Tumblr and instead built my own simple blogging tool.`,
    `The blog is rendered using React and I've created a small webpack plugin to compile each route down to a static HTML file. This makes it very easy to deploy the blog to a static host such as Amazon S3 (which I do automatically with a basic git push hook).`,
    `Each blog post is represented as a JavaScript file which makes adding new posts a breeze:`,
    js`export default {
  created_at: new Date("2016-04-28T06:08:16.320Z"),
  content: "Hello world, welcome to my blog!",
  slug: "hello-world",
  title: "Hello world!"
}`,
    `The \`content\` of a post can either just be a string (which it is in most cases) or an array of different JS object types, such as a Promise which can be used to load dynamic content within a post (the blog will render a spinner until the Promise resolves).`,
    `I'll make the code public once I've tidied it up slightly — so if you're looking for a simple JavaScript blogging tool, check it out when it's ready!`
  ],
  title: 'Welcome to my new blog!',
  slug: 'welcome',
  created_at: new Date('2016-04-28T06:08:16.320Z')
};
