import Index from 'handlers/index';
import Post from 'handlers/post';

export default function getRoutes(posts) {
  const routes = posts.map((post) => ({ path: `/posts/${post.slug}.html`, component: Post, props: { post, posts } }));
  routes.unshift({ path: '/', component: Index, index: true, props: { posts } });
  return routes;
}
