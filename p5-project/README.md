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
- **Apple sprite:** [Good Fruits] by [Master484], license: Public Domain.
- **Music:** [Cyberpunk Moonlight Sonata] by Joth.

[Good Fruits]: https://opengameart.org/content/good-fruits-m484-games
[Master484]: https://m484games.ucoz.com/
[Cyberpunk Moonlight Sonata]: https://opengameart.org/content/cyberpunk-moonlight-sonata

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

# Tutorials
[The Coding Train]: the best channel on youtube with tutorials for p5.js

[The Coding Train]: https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw
