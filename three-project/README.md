# Usage
- Run development server: `npm run start`
- Deployment: `npm run build`
- After deployment, an http server is needed to serve sprite images: `python3 -m http.server`


# Prerequisites
### Create a package.json
This file will list all the dependencies:

```bash
npm init -y
```

### Webpack
Webpack is module bundler for merging js/css files into one (optimal for browsers), and for automating the build process (like cmake). Webpack-cli is needed since webpack 4.

```bash
npm install --save-dev webpack webpack-cli
```

Webpack-dev-server works in-memory to refresh the browser automatically when files are modified:

```bash
npm install --save-dev webpack-dev-server
```

html-webpack-plugin is needed to generate automatically an index.html file:

```bash
npm install --save-dev html-webpack-plugin
```

file-loader is needed to copy images automatically on build:

```bash
npm install --save-dev file-loader
```

### Three.js
```
npm install three --save
```

### ESLint
Run linter on javascript source file:

```bash
npm install eslint --save-dev
npx eslint --init
npx eslint src/app.js
```


# Tutorials
- Short [tutorial][1] to get started with webpack.
- A more comprehensive [tutorial][2] about project structure with webpack.

[1]: https://medium.com/@yakubova92/intro-to-webpack-46e8862d6627
[2]: https://hackernoon.com/webpack-the-basics-2712a7ad640b


# Icons
Icons are available on [this website][4] on a permissive license.

[4]: https://iconify.design/icon-sets/
