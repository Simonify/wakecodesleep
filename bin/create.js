import fs from 'fs';
import { inspect } from 'util';

export default function create([title]) {
  const date = new Date();

  if (typeof title !== 'string' || !title.length) {
    title = 'Untitled post';
  }

  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDay().toString().padStart(2, '0');
  const slug = title.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  const fullSlug = `${year}-${month}-${day}-${slug}`;

  const post = `export default {
  title: ${JSON.stringify(title)},
  content: "",
  slug: ${JSON.stringify(fullSlug)},
  created_at: new Date(${JSON.stringify(date.toISOString())})
}  `;

  fs.writeFileSync(`${__dirname}/../posts/${fullSlug}.js`, post);

  const jsonPath = `${__dirname}/../posts/_posts.json`;
  const posts = JSON.parse(fs.readFileSync(jsonPath));

  posts.unshift(fullSlug);

  fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2));

  console.log('Post created at', `posts/${fullSlug}.js`);
}
