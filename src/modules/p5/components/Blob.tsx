import { Joint } from './Joint';
import { Point } from './Point';
import { JointParams, PointParams } from 'src/ts/interfaces/blob.interfaces';
import p5Types from 'p5';
import Sketch  from 'react-p5';

const Blob = () => {
  let points: PointParams[];
  let joints: JointParams[];

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    canvas.position(0, 0);

    p5.colorMode(p5.HSB, 360, 100, 100, 100);

    points = [];
    joints = [];

    const pointCount = 80;
    const radius = p5.min(p5.width, p5.height) * 0.3;
    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * p5.TWO_PI;
      const x = p5.cos(angle) * radius;
      const y = p5.sin(angle) * radius;
      points.push(new Point({ x, y, damping: 0.99 }));
    }

    for (let i = 0, l = points.length; i < l; i++) {
      const pointA = points[i];
      const pointB = points[(i + 1) % l];
      const pointC = points[(i + 2) % l];
      const pointD = points[p5.floor(i + l / 2) % l];
      joints.push(new Joint(pointA, pointB, 10, 0.75));
      joints.push(new Joint(pointA, pointC, 20, 0.5));
      joints.push(new Joint(pointA, pointD, radius * 2, 0.0125));
    }
  };

  const draw = (p5: p5Types) => {
    const hw = p5.width / 2;
    const hh = p5.height / 2;
    p5.clear();
    p5.noStroke();
    p5.fill(0);
    p5.translate(hw, hh);
     
    for (let i = 0, l: number = joints.length; i < l; i++) {
      joints[i].update(1);
    }

    const mx = p5.mouseX - hw;
    const my = p5.mouseY - hh;

    for (let i = 0, l: number = points.length; i < l; i++) {
      const pointA = points[i];
      const gravity = p5.createVector(pointA.x, pointA.y).normalize().mult(0.1);
      pointA.addForce(-gravity.x, -gravity.y);
      pointA.collide(mx, my, 80);
      for (let j = i + 1; j < l; j++) {
        const pointB = points[j];
        const force = pointA.repel(p5, pointB.x, pointB.y, 100, 0.1);
        if (force) {
          pointB.addForce(-force.x, -force.y);
        }
      }
      pointA.update(0.5);
      pointA.constrain(-hw, -hh, hw, hh);
    }

    p5.beginShape();
    for (let i = 0, l: number = points.length; i < l; i++) {
      p5.curveVertex(points[i].x, points[i].y);
    }
    p5.endShape();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Blob;
