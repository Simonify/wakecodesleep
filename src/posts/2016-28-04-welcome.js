import { js } from './tags';

export default {
  content: [
    js`export default function wakecodesleep() {
  return 'Welcome to my new blog!';
}`,
    `I've decided to create a blog to help me share any thoughts that I have during the day, interesting snippets of code and any useful links which I discover. I also decided to re-invent the wheel rather than use an existing platform such as Medium or Tumblr and instead built my own simple blogging tool.`,
    `The blog is rendered using React and I've created a small webpack plugin to compile each route down to a static HTML file. This makes it very easy to entire deploy the blog to a static host such as Amazon S3 (which I do automatically with a simple git push hook).`
  ],
  title: 'Welcome to my new blog!',
  slug: 'welcome',
  created_at: new Date('2016-04-28T06:08:16.320Z')
};
