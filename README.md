<img src="./assets/logo.svg" width=72 height=72 alt="UI/UX Kit" />

# UI/UX Kit

UI/UX Kit is a lightweight and flexible CSS front-end component kit based on [ITCSS](https://itcss.io/) architecture
and built with [Sass](https://sass-lang.com/).

UI/UX Kit does its best to provide zero cosmetic styling. That means UI/UX Kit can be used on any and all
types of project without suggesting a look-and-feel.

## Browser support

All modern browsers are supported (except Internet Explorer).

## Installation

**You can use UI/UX Kit in your project by installing it using a package manager (recommended):**

[npm](https://www.npmjs.com/):

```
$ npm install @guillaumeferber/ui-kit -D
```

## Philosophy

### Architecture

UI/UX Kit follows a specific folder structure based on ITCSS, which you should follow as well in your own CSS
directory:

- `settings/`: Used with Sass and contain global variables, colors definitions, etc.
- `tools/`: Globally used mixins and functions.
- `generic/`: Reset and normalize styles.
- `elements/`: Unclassed HTML elements (like `<h1>`, `<a>`, etc.).
- `objects/`: Class-based selectors which define undecorated design patterns.
- `components/`: Specific UI components. Because UI/UX Kit does no cosmetic styling, it is up to you to author this
  layer. To get ready-to-use recipes with components, see section [demo](./demo/README.md)
- `utilities/`: Helper classes with high-specificity.

### Methodology and namespaces

UI/UX Kit is written using [BEM](https://en.bem.info/methodology/) (Block, Element, Modifier) methodology for
building component-based user interfaces.

**It also provides some classes with specific namespace:**

- `.o-`: Signify that something is an Object, and that it may be used in any number of unrelated contexts to the one you
  can currently see it in.
- `.c-`: Signify that something is a Component. This is a concrete, implementation-specific piece of UI.
- `.u-`: Signify that this class is a Utility class. It has very specific role and should not be bound onto or changed.
  It can be reused and is not tied to any specific piece of UI.

Every class in either of these three directories (layers) gets the appropriate prefix in its class name. Be sure to
follow this convention in your own code as well to keep a consistent naming convention across your code base.

## Getting started

### Importing

As much as possible, avoid modifying UI/UX Kit's core files. The best way to do this is to import UI/UX Kit's
source Sass files in your own project.

**You have two options** : include all of UI/UX Kit, or pick the parts you need.

We encourage the latter, though be aware that `settings/` and `tools/` folders are required.

```scss
// Settings (required)
@import 'node_modules/@guillaumeferber/ui-kit/scss/settings/colors';
@import 'node_modules/@guillaumeferber/ui-kit/scss/settings/global';

// Tools (required)
@import 'node_modules/@guillaumeferber/ui-kit/scss/tools/functions';
@import 'node_modules/@guillaumeferber/ui-kit/scss/tools/mixins';

// Generic (optional)
@import 'node_modules/@guillaumeferber/ui-kit/scss/generic/normalize';
@import 'node_modules/@guillaumeferber/ui-kit/scss/generic/box-sizing';
@import 'node_modules/@guillaumeferber/ui-kit/scss/generic/reset';
@import 'node_modules/@guillaumeferber/ui-kit/scss/generic/shared';

// Elements (optional)
@import 'node_modules/@guillaumeferber/ui-kit/scss/elements/root';
@import 'node_modules/@guillaumeferber/ui-kit/scss/elements/page';
@import 'node_modules/@guillaumeferber/ui-kit/scss/elements/heading';
@import 'node_modules/@guillaumeferber/ui-kit/scss/elements/forms';
@import 'node_modules/@guillaumeferber/ui-kit/scss/elements/tables';

// Objects (optional)
@import 'node_modules/@guillaumeferber/ui-kit/scss/objects/container';

// Utilities (optional)
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/position';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/display';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/flex';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/alignment';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/float';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/clear';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/sizing';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/spacing';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/overflow';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/colors';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/text';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/visibility';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/cursors';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/reset';
@import 'node_modules/@guillaumeferber/ui-kit/scss/utilities/helper';
```

### Theming

Every Sass variable in UI/UX Kit includes the `!default` flag allowing you to override the variable's default value
in your own Sass file without modifying UI/UX Kit's source code. Your overrides must come before you import UI/UX Kit's setting files.

#### Overriding variable

To modify an existing variable `$container-max-width`, add the following to your custom Sass file:

```scss
$container-max-width: 96rem;
```

#### Overriding map

To modify an existing key in our `$spacers` map, add the following to your custom Sass file:

```scss
$spacers: (
  'base': 2rem,
);
```

To add a new key and value to `$spacers` map, add the following to your custom Sass file:

```scss
$spacers: (
  'custom-spacer': 1rem,
);
```

To remove an existing key from `$spacers` map, add the following to your custom Sass file:

```scss
$spacers: (
  'base': null,
);
```
## Using generated classes in your templates

## Pro Tips

UI/UX Kit also provides some features and tools that should be of great help to you.

### CSS Custom properties

CSS custom properties allow you to store and retrieve values from properties you define yourself.

They follow the same rules as other CSS properties, so you are able to define and use them at multiple levels, following
standard CSS cascading and specificity rules.

For example, this Sass map:

```scss
$spacers: (
  'lg': 4.8rem,
  'base': 2.4rem,
  'sm': 1.2rem,
);
```

will automatically add these custom properties in the root element:

```scss
:root {
  --spacer-lg: 4.8rem;
  --spacer-base: 2.4rem;
  --spacer-sm: 1.2rem;
}
```

You can now retrieve these custom properties like this:

```scss
.c-custom-component {
  margin: var(--spacer-base);
  padding: var(--spacer-sm);
}
```

### Responsive breakpoints

You may have noticed that UI/UX Kit provides a default map of breakpoint values:

```scss
$breakpoints: (
  'phone': 47.9375em,
  'tablet': 64em,
);
```

Like any other UI/UX Kit's variables, it is possible to override this Sass map to modify, add or remove some
responsive breakpoint keys:

```scss
$breakpoints: (
  'phone': null,
  'tablet': null,
  'sm': 47.9375em,
);
```

It is even possible to delete all responsive breakpoint keys if your website doesn't require to be responsive:

```scss
$breakpoints: ();
```

These responsive breakpoints are available via Sass mixin `@mixin media($keys...)` by adding optional suffixes: `-up` or
`-down`.

**It is important to note that the suffix `-up` is exclusive while the suffix `-down` is inclusive.**

This Sass mixin with `($key)` name:

```scss
@include media('tablet') {
  .c-custom-component {
    margin: var(--spacer-base);
  }
}
```

will generate these responsive breakpoints:

```scss
@media (max-width: 64em) and (min-width: 48em) {
  .c-custom-component {
    margin: var(--spacer-base);
  }
}
```

This Sass mixin with `($key-up)` name:

```scss
@include media('tablet-up') {
  .c-custom-component {
    margin: var(--spacer-base);
  }
}
```

will generate this responsive breakpoint:

```scss
@media (min-width: 64.0625em) {
  .c-custom-component {
    margin: var(--spacer-base);
  }
}
```

This Sass mixin with `($key-down)` name:

```scss
@include media('tablet-down') {
  .c-custom-component {
    margin: var(--spacer-base);
  }
}
```

will generate this responsive breakpoint:

```scss
@media (max-width: 64em) {
  .c-custom-component {
    margin: var(--spacer-base);
  }
}
```

This Sass mixin with multiple `($key1, $key2)` names:

```scss
@include media('phone', 'tablet-up') {
  .c-custom-component {
    margin: var(--spacer-base);
  }
}
```

will generate these responsive breakpoints:

```scss
@media (max-width: 47.9375em) {
  .c-custom-component {
    margin: var(--spacer-base);
  }
}

@media (min-width: 64.0625em) {
  .c-custom-component {
    margin: var(--spacer-base);
  }
}
```

#### Summary table (UI/UX Kit's default settings)

| Key           | Phone | Tablet | Desktop |
| ------------- | ----- | ------ | ------- |
| `phone`       | ✓     | ✗      | ✗       |
| `tablet-down` | ✓     | ✓      | ✗       |
| `tablet`      | ✗     | ✓      | ✗       |
| `phone-up`    | ✗     | ✓      | ✓       |
| `tablet-up`   | ✗     | ✗      | ✓       |

## Authors

**Guillaume Ferber** - _Initial work_ - [guillaumeferber](mailto:info@guillaumeferber.com).
