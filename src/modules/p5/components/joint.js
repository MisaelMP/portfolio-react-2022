// import { JointParams } from 'src/ts/interfaces/blob.interfaces';
// import p5Types from 'p5';

// function update(this: any, p5: p5Types, dt = 1){
//   const diffx = this.pointA.x - this.pointB.x;
//   const diffy = this.pointA.y - this.pointB.y;
//   const mag = p5.sqrt(diffx * diffx + diffy * diffy);
//   const diffMag = this.len - mag;
//   if (mag > 0) {
//     const invMag = 1 / mag;
//     const forceX = diffx * invMag * diffMag * this.strength * 0.5 * dt;
//     const forceY = diffy * invMag * diffMag * this.strength * 0.5 * dt;
//     this.pointA.addForce(forceX, forceY);
//     this.pointB.addForce(-forceX, -forceY);
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

export class Joint {
  constructor(pointA, pointB, len, strength) {
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
    const diffMag = this.len - mag;
    if (mag > 0) {
      const invMag = 1 / mag;
      const forceX = diffx * invMag * diffMag * this.strength * 0.5 * dt;
      const forceY = diffy * invMag * diffMag * this.strength * 0.5 * dt;
      this.pointA.addForce(forceX, forceY);
      this.pointB.addForce(-forceX, -forceY);
    }
  }

  draw(ctx) {
    ctx.line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
  }
}
