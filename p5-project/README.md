# Prerequisites
### Production
```bash
npm install --save p5
```

### Development
Webpack and its tools:

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```

Initialize javascript linter (vim's ale plugin will automatically detect it afterwards):

```bash
npm install eslint --save-dev
npx eslint --init
```


# p5.js
The instantiation of p5 inside a scope works using closures (inner functions) similary to the example below. Note that modification of objects (i.e. this) elements inside a function persist outside the function:

```javascript
function outer(p) {
    p.draw = () => {
        console.log('p.init function');
    }
}

class MyClass {
    constructor(closure) {
        // add this.draw() method to this object
        closure(this);
    }
}

const myObj = new MyClass(outer);
myObj.draw();
```
