import posts from './_posts.json';

export default posts.map((fn) => require(`./${fn}`).default);
