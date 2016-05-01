import { js } from './tags';

export default {
  content: [
    `When it comes to question of how to style React components, the obvious answer is to just do it the same way we have for many years — **CSS**. Stylesheets are a fundamental building block of the web and there are probably not many (if any at all) websites that you visit which don't load at least one external stylesheet.`,

    `So why would you ever consider doing anything else? The idea of building a site without stylesheets sounds crazy at first but I decided to investigate the idea when I realised the vast majority of the CSS that I was writing was almost always directly related to specific React components. I strive for most of my components to be pure and fully encapsulated so having styles stored and loaded in a completely separate way seemed odd. I wasn't really separating my concerns by using stylesheets separate from my JavaScript; the CSS and JavaScript were still closely coupled. It felt like I was just putting the the same concerns in different files.`,

    `After doing a quick bit of searching, I discovered that there are already several alternatives to vanilla stylesheets that exist within the React ecosystem. In this post, I'll explain two different ways of working with styles in a React application. The first option being the most familiar; using \`.css\` files but in a slightly more modern way where as the second option almost entirely drops stylesheets in favour of the \`style\` prop.`,

    `### webpack's css-loader

[css-loader](https://github.com/webpack/css-loader) is a loader for [webpack](https://webpack.github.io/) that allows you to import a stylesheet as you would any other JavaScript module. It is not specifically designed for use with React but makes a good companion since you can store your stylesheets directly with your components. When importing a \`.css\` file, the loader will automatically convert each selector to a unique identifier that you can use as a \`className\`.`,

    `It also introduces some additional functionality to CSS, including a \`composes\` rule which, as its name suggests, allows you to compose/apply another selector's styles (similar to \`@extends\` in SCSS), for example:`,

    js`.row {
  padding: 5px;
  color: red;
}

.usernameRow {
  composes: row;
  font-weight: 500;
}`,

    `is converted to something along the lines of:`,

    js`module.exports = {
  row: "_23_aKvs-b8bW2Vg3fwHozO",
  usernameRow: "_13LGdX8RMStbBE9w-t0gZ1 _23_aKvs-b8bW2Vg3fwHozO"
}`,

    `You can then use these identifiers as values for \`className\` props (you can use something like my own [class-name](https://github.com/simonify/class-name) module to conditionally combine multiple class names together). One of the great things about css-loader is that because it still uses stylesheets, you can use it in conjuction with other great webpack loaders such as [precss](https://github.com/jonathantneal/precss).`,

    `In summary, css-loader and [CSS modules](https://github.com/css-modules/css-modules) let you keep the familiarity of CSS but work with it in a more modern, modular way. You can read more about it here: https://github.com/webpack/css-loader.`,

    `### Radium

[Radium](https://github.com/FormidableLabs/radium) is an enhancer for React components. Wrapping a component with the \`Radium\` function supercharges the \`style\` prop. Radium does this by overloading the render function of the provided component, recursing in to the result of the original render and applying some juice to the \`style\` prop of each element.`,

    `Radium enhances the style prop in a number of ways. The enhancement you'll most likely use the most often is instead of only being able to provide an plain object as a value to the \`style\` prop, you can instead pass an array of style objects which will be flattened together. This alone is a very handy feature for composing styles. Style objects can also include a number of CSS inspired properties (such as \`:hover\`) which Radium will automatically apply to your style object when in the correct state.`,

    js`import React from 'react';
import Radium from 'radium';

const styles = {
  row: {
    padding: 10,
    backgroundColor: 'yellow',
    ':hover': {
      backgroundColor: 'red'
    }
  },
  username: {
    fontWeight: 500
  }
};

const UsernameRow = ({ username }) => (
  <div style={[styles.row, styles.username]}>
    {username}
  </div>
);

export default Radium(UsernameRow);`,

    `There are a number of CSS selectors which Radium does **not** support natively, such as \`:last-child\` but in most cases, you can add support for them yourself by simply using a conditional when constructing your array of styles. For example, to add custom styles to the last child in an array of components you can just do something along the lines of:`,

    js`const names = ['Simon', 'Alexander', 'Mike'];
const length = names.length - 1;

return names.map((name, index) => {
  const style = [
    styles.person.base,
    index === length && styles.person.last
  ];

  return (
    <div key={name} style={style}>
      {name}
    </div>
  );
});`,

    `One of the most powerful things about using JavaScript to define your styles is of course that you can take full advantage of the JavaScript language. Variables, which were only recently added to CSS, are of course available. Composing styles becomes ridiculously easy by using the ES6 spread operator or through building an array of styles. Providing and overriding styles of nested components can easily be achieved - without any need for \`!important\` flags.`,

    `On the other hand, one of the big negatives of using the style prop rather than a stylesheet is that you lose a lot of great existing tooling - such as the aforementioned [precss](https://github.com/jonathantneal/precss). The biggest time saver that you lose by using inline styles is most probably the autogeneration of browser vendor prefixes. Luckily, Radium has support for autoprefixing built in. It bundles [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) which takes care of adding only the browser vendor prefixes required to your styles.`,

    `If you do decide to use Radium for a project you most probably still won't be completely free from CSS. While you can style all of ***your*** React components with Radium if you want to, there will most probably be times when you need to style components that do not allow you to override their styles via props or DOM elements which are not controlled by React. For those situations, Radium provides a \`Style\` component which lets you provide rules scoped to fixed CSS selectors. For example:`,

    js`<Style
  scopeSelector=".body"
  rules={{
    margin: 0,
    padding: 0,
    inner: {
      padding: 50
    }
  }}
/>`,

    `will create the following element:`,

    js`<style>
  .body {
    margin: 0;
    padding: 0;
  }

  .body .inner {
    padding: 50px;
  }
</style>`,

    `Radium has a number of other features including support for media queries and keyframes. You can learn more about Radium at: https://github.com/FormidableLabs/radium.`,
  ],
  title: 'Styling React',
  slug: 'styling-react',
  created_at: new Date('2016-05-01T06:07:17.057Z')
}
