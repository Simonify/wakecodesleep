import posts from './_posts.json';

export default posts.reverse().map((fn) => require(`./${fn}`).default);
