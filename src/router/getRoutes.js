import Index from 'handlers/index';
import Post from 'handlers/post';

export default function getRoutes(posts) {
  const routes = posts.map((post) => ({
    component: Post,
    path: `/posts/${post.slug}.html`,
    props: { post, posts }
  }));

  routes.unshift({
    component: Index,
    index: true,
    path: '/',
    props: { posts }
  });

  return routes;
}
