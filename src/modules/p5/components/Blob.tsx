import React, { ComponentProps } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

interface BlobProps {}

let x = 50;
let y = 50;

const Blob: React.FC<BlobProps> = (props: BlobProps) => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Blob;
