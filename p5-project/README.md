# Installation
```bash
npm install
```

# Building
Initial build with:

```bash
gulp build
```

For automatic browser reloading during development:

```bash
gulp watch
```

# Assets
- [Good Fruits] by [Master484], license: Public Domain.

[Good Fruits]: https://opengameart.org/content/good-fruits-m484-games
[Master484]: https://m484games.ucoz.com/

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
