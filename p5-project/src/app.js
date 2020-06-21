import p5 from 'p5';

// p5 in instance mode (namespacing) using closures
const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(640, 480);
  };

  p.draw = () => {
    // draw red rectange with green edges on black background
    p.background(0, 0, 0);
    p.fill(255, 0, 0);
    p.stroke(0, 255, 0);
    p.rect(100, 100, 50, 50);
  };
};

const myp5 = new p5(sketch);
