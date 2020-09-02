# Installation
```bash
npm install
```

# Building
```bash
gulp build
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
