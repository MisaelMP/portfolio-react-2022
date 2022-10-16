import { JointParams, PointParams } from 'src/ts/interfaces/blob.interfaces';
import p5Types from 'p5';

// let pointA: PointParams[];
// let pointB: PointParams[];

// function update(dt = 1){
//   const diffx = pointA.x - pointB.x;
//   const diffy = pointA.y - pointB.y;
//   const mag = window.p5.prototype.sqrt(diffx * diffx + diffy * diffy);
//   const diffMag = len - mag;
//   if (mag > 0) {
//     const invMag = 1 / mag;
//     const forceX = diffx * invMag * diffMag * strength * 0.5 * dt;
//     const forceY = diffy * invMag * diffMag * strength * 0.5 * dt;
//     pointA.addForce(forceX, forceY);
//     pointB.addForce(-forceX, -forceY);
//   }
// };

// function draw(this: any, ctx: p5Types){
//   ctx.line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
// };

// export const joint = (
//   pointA: object,
//   pointB: object,
//   len: number,
//   strength: number
// ): JointParams => {
//   return {
//     pointA,
//     pointB,
//     len,
//     strength,
//     update,
//     draw,
//   };
// };

export class Joint implements JointParams {
  pointA: PointParams;
  pointB: PointParams;
  len: number;
  strength: number;
  originalLen: number;

  constructor(pointA: PointParams, pointB: PointParams, len: number, strength: number) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.originalLen = len;
    this.len = len;
    this.strength = strength;
  }

  update(dt = 1) {
    const diffx = this.pointA.x - this.pointB.x;
    const diffy = this.pointA.y - this.pointB.y;
    const mag = window.p5.prototype.sqrt(diffx * diffx + diffy * diffy);
    const diffMag = +this.len - mag;
    if (mag > 0) {
      const invMag = 1 / mag;
      const forceX = diffx * invMag * diffMag * +this.strength * 0.5 * dt;
      const forceY = diffy * invMag * diffMag * +this.strength * 0.5 * dt;
      this.pointA.addForce(forceX, forceY);
      this.pointB.addForce(-forceX, -forceY);
    }
  }

  draw(ctx: p5Types) {
    ctx.line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
  }
}
