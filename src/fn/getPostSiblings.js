export default function getPostSiblings(posts, post) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i] === post) {
      return {
        previous: posts[i + 1],
        next: posts[i - 1]
      };
    }
  }

  return null;
}
