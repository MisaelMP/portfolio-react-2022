// import p5Types from 'p5';
// import { PointParams } from 'src/ts/interfaces/blob.interfaces';

// function addForce(this: any, p5: p5Types, x: number, y: number, instant: boolean = false) {
//   this.nextx += x;
//   this.nexty += y;
//   if (instant) {
//     this.delayedx = p5.lerp(this.delayedx, this.nextx, 0.25);
//     this.delayedy = p5.lerp(this.delayedy, this.nexty, 0.25);
//   }
// };

// function attract(this: any, p5: p5Types, otherX: number, otherY: number, strength: number = 1) {
//   const diffx = otherX - this.x;
//   const diffy = otherY - this.y;
//   const mag = diffx * diffx + diffy * diffy;
//   if (mag > 0.01) {
//     const magSqrt = 1 / p5.sqrt(mag);
//     this.addForce(
//       diffx * magSqrt * strength, // force x
//       diffy * magSqrt * strength // force y
//     );
//   }
// };

// function repel(this: any, p5: p5Types, otherX: number, otherY: number, radius: number = 1, strength: number = 1) {
//   const diffx = this.x - otherX;
//   const diffy = this.y - otherY;
//   const mag = diffx * diffx + diffy * diffy;
//   const combinedRadius = radius + this.radius;
//   const minDist = combinedRadius * combinedRadius;
//   if (mag > 0 && mag < minDist) {
//     const magSqrt = 1 / p5.sqrt(mag);
//     const forceX = diffx * magSqrt * strength;
//     const forceY = diffy * magSqrt * strength;
//     this.addForce(forceX, forceY);
//     return { x: forceX, y: forceY };
//   }

//   return null;
// };

// function collide(this: any, p5: p5Types, otherX: number, otherY: number, radius: number) {
//   const diffx = otherX - this.x;
//   const diffy = otherY - this.y;
// //   console.log(p5);
//   const diffMag = p5.sqrt(diffx * diffx + diffy * diffy);
  
//   const combinedRadius = radius + this.radius;
//   if (diffMag < combinedRadius) {
//     const forceMag = diffMag - combinedRadius;
//     const invMag = 1 / diffMag;
//     this.addForce(diffx * invMag * forceMag, diffy * invMag * forceMag, true);
//   }
// };

// function constrain(this: any, left: number, top: number, right: number, bottom: number) {
//   const { x, y, oldx, oldy, friction, radius } = this;
//   const vx = (x - oldx) * friction;
//   const vy = (y - oldy) * friction;

//   left += radius;
//   top += radius;
//   right -= radius;
//   bottom -= radius;

//   if (x > right) {
//     this.x = right;
//     this.oldx = x + vx;
//   } else if (x < left) {
//     this.x = left;
//     this.oldx = x + vx;
//   }
//   if (y > bottom) {
//     this.y = bottom;
//     this.oldy = y + vy;
//   } else if (y < top) {
//     this.y = top;
//     this.oldy = y + vy;
//   }
// };

// function update(this: any, p5: p5Types, dt = 1){
//   let vx = this.x - this.oldx;
//   let vy = this.y - this.oldy;
//   this.oldx = this.x - vx * this.damping * (1 - dt);
//   this.oldy = this.y - vy * this.damping * (1 - dt);
//   this.x = this.nextx + vx * this.damping * dt;
//   this.y = this.nexty + vy * this.damping * dt;
//   this.delayedx = p5.lerp(this.delayedx, this.x, 0.1);
//   this.delayedy = p5.lerp(this.delayedy, this.y, 0.1);
//   this.nextx = this.x;
//   this.nexty = this.y;
// };

// function draw(this: any, ctx: p5Types) {
//   ctx.point(this.delayedx, this.delayedy);
// };


// export const point = ({x, y, radius, damping = 0.9, friction = 0.1, parent, color =  0}: {x?: any; y?: any; radius?: number; damping: number; friction?: number; parent?: HTMLElement; color?: number;}, delayedx = x, delayedy = y, oldx = x, oldy = y, originalRadius = radius,  ): PointParams => {
//     return {
//       x,
//       y,
//       radius,
//       damping,
//       delayedx,
//       delayedy,
//       oldx,
//       oldy,
//       friction,
//       parent,
//       color,
//       addForce,
//       attract,
//       repel,
//       collide,
//       constrain,
//       update,
//       draw,
//       originalRadius,
//     };
// };
export class Point {
  constructor({ x, y, radius, damping, friction, parent, color = 0 }) {
    this.x = x;
    this.y = y;
    this.oldx = x;
    this.oldy = y;
    this.nextx = x;
    this.nexty = y;
    this.delayedx = x;
    this.delayedy = y;
    this.radius = radius || 10;
    this.originalRadius = radius;
    this.damping = damping || 0.9;
    this.friction = friction || 0.1;
    this.parent = parent;
    this.maxVelocity = 50;
    this.color = color;
  }

  addForce(x, y, instant = false) {
    this.nextx += x;
    this.nexty += y;
    if (instant) {
      this.delayedx = window.p5.prototype.lerp(this.delayedx, this.nextx, 0.25);
      this.delayedy = window.p5.prototype.lerp(this.delayedy, this.nexty, 0.25);
    }
  }

  attract(otherX, otherY, strength = 1) {
    const diffx = otherX - this.x;
    const diffy = otherY - this.y;
    const mag = diffx * diffx + diffy * diffy;
    if (mag > 0.01) {
      const magSqrt = 1 / window.p5.prototype.sqrt(mag);
      this.addForce(
        diffx * magSqrt * strength, // force x
        diffy * magSqrt * strength // force y
      );
    }
  }

  repel(otherX, otherY, radius = 1, strength = 1) {
    const diffx = this.x - otherX;
    const diffy = this.y - otherY;
    const mag = diffx * diffx + diffy * diffy;
    const combinedRadius = radius + this.radius;
    const minDist = combinedRadius * combinedRadius;
    if (mag > 0 && mag < minDist) {
      const magSqrt = 1 / window.p5.prototype.sqrt(mag);
      const forceX = diffx * magSqrt * strength;
      const forceY = diffy * magSqrt * strength;
      this.addForce(forceX, forceY);
      return { x: forceX, y: forceY };
    }

    return null;
  }

  collide(otherX, otherY, radius) {
    const diffx = otherX - this.x;
    const diffy = otherY - this.y;
    const diffMag = window.p5.prototype.sqrt(diffx * diffx + diffy * diffy);
    const combinedRadius = radius + this.radius;
    if (diffMag < combinedRadius) {
      const forceMag = diffMag - combinedRadius;
      const invMag = 1 / diffMag;
      this.addForce(diffx * invMag * forceMag, diffy * invMag * forceMag, true);
    }
  }

  constrain(left, top, right, bottom) {
    const { x, y, oldx, oldy, friction, radius } = this;
    const vx = (x - oldx) * friction;
    const vy = (y - oldy) * friction;

    left += radius;
    top += radius;
    right -= radius;
    bottom -= radius;

    if (x > right) {
      this.x = right;
      this.oldx = x + vx;
    } else if (x < left) {
      this.x = left;
      this.oldx = x + vx;
    }
    if (y > bottom) {
      this.y = bottom;
      this.oldy = y + vy;
    } else if (y < top) {
      this.y = top;
      this.oldy = y + vy;
    }
  }

  update(dt = 1) {
    let vx = this.x - this.oldx;
    let vy = this.y - this.oldy;
    this.oldx = this.x - vx * this.damping * (1 - dt);
    this.oldy = this.y - vy * this.damping * (1 - dt);
    this.x = this.nextx + vx * this.damping * dt;
    this.y = this.nexty + vy * this.damping * dt;
    this.delayedx = window.p5.prototype.lerp(this.delayedx, this.x, 0.1);
    this.delayedy = window.p5.prototype.lerp(this.delayedy, this.y, 0.1);
    this.nextx = this.x;
    this.nexty = this.y;
  }

  draw(ctx) {
    ctx.point(this.delayedx, this.delayedy);
  }
}