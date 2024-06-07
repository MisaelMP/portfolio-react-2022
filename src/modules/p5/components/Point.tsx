import { PointParams } from '../../../ts/interfaces/blob.interfaces';
export class Point implements PointParams {
	x: number;
	y: number;
	damping: number;
	friction: number;
	radius: number;
	parent?: HTMLElement;
	color: number;
	delayedx: number;
	delayedy: number;
	oldx: number;
	oldy: number;
	originalRadius?: number;
	nextx: number;
	nexty: number;
	maxVelocity: number;

	constructor({
		x,
		y,
		radius,
		damping,
		friction,
		parent,
		color = 0,
	}: {
		x: number;
		y: number;
		radius?: number;
		damping?: number;
		friction?: number;
		parent?: HTMLElement;
		color?: number;
	}) {
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

	addForce(x: number, y: number, instant = false) {
		this.nextx += x;
		this.nexty += y;
		if (instant) {
			this.delayedx = window.p5.prototype.lerp(this.delayedx, this.nextx, 0.25);
			this.delayedy = window.p5.prototype.lerp(this.delayedy, this.nexty, 0.25);
		}
	}

	attract(otherX: number, otherY: number, strength = 1) {
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

	repel(otherX: number, otherY: number, radius = 1, strength = 1) {
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

	collide(otherX: number, otherY: number, radius: number) {
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

	constrain(left: number, top: number, right: number, bottom: number) {
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

	draw(ctx: { point: (arg0: any, arg1: any) => void }) {
		ctx.point(this.delayedx, this.delayedy);
	}
}
