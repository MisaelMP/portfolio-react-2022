import { useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import p5 from 'p5';
import { Point, Joint } from '../../../ts/interfaces/blob.interfaces';

const Blob = () => {
	const sketchRef = useRef(null);
	const location = useLocation();

	useLayoutEffect(() => {
		let sketchInstance: p5;
		let resizeTimeout: ReturnType<typeof setTimeout>;

		const sketch = (p: p5) => {
			let points: Point[];
			let joints: Joint[];

			const resizeCanvas = () => {
				let parentElement = document.querySelector('main[data-canvas]') as HTMLElement;
				if (parentElement && p) {
					p.resizeCanvas(parentElement.offsetWidth, parentElement.offsetHeight);
				}
			};

			p.setup = () => {
				let parentElement = document.querySelector('main[data-canvas]') as HTMLElement;
				if (parentElement) {
					let canvas = p.createCanvas(parentElement.offsetWidth, parentElement.offsetHeight);
					canvas.parent(parentElement);
					canvas.position(0, 0);
				}

				p.colorMode(p.HSB, 360, 100, 100, 100);

				points = [];
				joints = [];

				const pointCount = 50;
				const radius = Math.min(p.width, p.height) * 0.3;
				for (let i = 0; i < pointCount; i++) {
					const angle = (i / pointCount) * p.TWO_PI;
					const x = p.cos(angle) * radius;
					const y = p.sin(angle) * radius;
					points.push({
						x,
						y,
						oldx: x,
						oldy: y,
						nextx: x,
						nexty: y,
						delayedx: x,
						delayedy: y,
						radius: 10,
						originalRadius: 10,
						damping: 0.99,
						friction: 0.2,
						parent: null,
						maxVelocity: 50,
						color: 0,
						addForce(x, y, instant = false) {
							this.nextx += x;
							this.nexty += y;
							if (instant) {
								this.delayedx = p.lerp(this.delayedx, this.nextx, 0.25);
								this.delayedy = p.lerp(this.delayedy, this.nexty, 0.25);
							}
						},
						attract(otherX, otherY, strength = 1) {
							const diffx = otherX - this.x;
							const diffy = otherY - this.y;
							const mag = diffx * diffx + diffy * diffy;
							if (mag > 0.01) {
								const magSqrt = 1 / p.sqrt(mag);
								this.addForce(
									diffx * magSqrt * strength, // force x
									diffy * magSqrt * strength // force y
								);
							}
						},
						repel(otherX, otherY, radius = 1, strength = 1) {
							const diffx = this.x - otherX;
							const diffy = this.y - otherY;
							const mag = diffx * diffx + diffy * diffy;
							const combinedRadius = radius + this.radius;
							const minDist = combinedRadius * combinedRadius;
							if (mag > 0 && mag < minDist) {
								const magSqrt = 1 / p.sqrt(mag);
								const forceX = diffx * magSqrt * strength;
								const forceY = diffy * magSqrt * strength;
								this.addForce(forceX, forceY);
								return { x: forceX, y: forceY };
							}

							return null;
						},
						collide(otherX, otherY, radius) {
							const diffx = otherX - this.x;
							const diffy = otherY - this.y;
							const diffMag = p.sqrt(diffx * diffx + diffy * diffy);
							const combinedRadius = radius + this.radius;
							if (diffMag < combinedRadius) {
								const forceMag = diffMag - combinedRadius;
								const invMag = 1 / diffMag;
								this.addForce(diffx * invMag * forceMag, diffy * invMag * forceMag, true);
							}
						},
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
						},
						update(dt = 1) {
							let vx = this.x - this.oldx;
							let vy = this.y - this.oldy;
							this.oldx = this.x - vx * this.damping * (1 - dt);
							this.oldy = this.y - vy * this.damping * (1 - dt);
							this.x = this.nextx + vx * this.damping * dt;
							this.y = this.nexty + vy * this.damping * dt;
							this.delayedx = p.lerp(this.delayedx, this.x, 0.1);
							this.delayedy = p.lerp(this.delayedy, this.y, 0.1);
							this.nextx = this.x;
							this.nexty = this.y;
						},
						draw(ctx) {
							ctx.point(this.delayedx, this.delayedy);
						},
					});
				}

				for (let i = 0, l = points.length; i < l; i++) {
					const pointA = points[i];
					const pointB = points[(i + 1) % l];
					const pointC = points[(i + 2) % l];
					const pointD = points[Math.floor(i + l / 2) % l];
					joints.push({
						pointA,
						pointB,
						originalLen: 10,
						len: 10,
						strength: 0.75,
						update(dt = 1) {
							const diffx = this.pointA.x - this.pointB.x;
							const diffy = this.pointA.y - this.pointB.y;
							const mag = p.sqrt(diffx * diffx + diffy * diffy);
							const diffMag = this.len - mag;
							if (mag > 0) {
								const invMag = 1 / mag;
								const forceX = diffx * invMag * diffMag * this.strength * 0.5 * dt;
								const forceY = diffy * invMag * diffMag * this.strength * 0.5 * dt;
								this.pointA.addForce(forceX, forceY);
								this.pointB.addForce(-forceX, -forceY);
							}
						},
						draw(ctx) {
							ctx.line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
						},
					});
					joints.push({
						pointA,
						pointB: pointC,
						originalLen: 20,
						len: 20,
						strength: 0.5,
						update(dt = 1) {
							const diffx = this.pointA.x - this.pointB.x;
							const diffy = this.pointA.y - this.pointB.y;
							const mag = p.sqrt(diffx * diffx + diffy * diffy);
							const diffMag = this.len - mag;
							if (mag > 0) {
								const invMag = 1 / mag;
								const forceX = diffx * invMag * diffMag * this.strength * 0.5 * dt;
								const forceY = diffy * invMag * diffMag * this.strength * 0.5 * dt;
								this.pointA.addForce(forceX, forceY);
								this.pointB.addForce(-forceX, -forceY);
							}
						},
						draw(ctx) {
							ctx.line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
						},
					});
					joints.push({
						pointA,
						pointB: pointD,
						originalLen: radius * 2,
						len: radius * 2,
						strength: 0.0125,
						update(dt = 1) {
							const diffx = this.pointA.x - this.pointB.x;
							const diffy = this.pointA.y - this.pointB.y;
							const mag = p.sqrt(diffx * diffx + diffy * diffy);
							const diffMag = this.len - mag;
							if (mag > 0) {
								const invMag = 1 / mag;
								const forceX = diffx * invMag * diffMag * this.strength * 0.5 * dt;
								const forceY = diffy * invMag * diffMag * this.strength * 0.5 * dt;
								this.pointA.addForce(forceX, forceY);
								this.pointB.addForce(-forceX, -forceY);
							}
						},
						draw(ctx) {
							ctx.line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
						},
					});
				}
				resizeCanvas();
			};

			p.windowResized = () => {
				resizeCanvas();
			};

			p.draw = () => {
				const hw = p.width / 2;
				const hh = p.height / 2;
				p.clear();
				p.noStroke();
				p.fill(0);

				p.translate(hw, hh);

				for (let i = 0, l = joints.length; i < l; i++) {
					joints[i].update(1);
				}

				const mx = p.mouseX - hw;
				const my = p.mouseY - hh;

				for (let i = 0, l = points.length; i < l; i++) {
					const pointA = points[i];
					const gravity = p.createVector(pointA.x, pointA.y).normalize().mult(0.1);
					pointA.addForce(-gravity.x, -gravity.y);
					pointA.collide(mx, my, 60);
					for (let j = i + 1; j < l; j++) {
						const pointB = points[j];
						const force = pointA.repel(pointB.x, pointB.y, 100, 0.1);
						if (force) {
							pointB.addForce(-force.x, -force.y);
						}
					}
					pointA.update(0.5);
					pointA.constrain(-hw, -hh, hw, hh);
				}

				p.beginShape();
				for (let i = 0, l = points.length; i < l; i++) {
					p.curveVertex(points[i].x, points[i].y);
				}
				p.endShape(p.CLOSE);
			};
		};

		if (sketchRef.current) {
			sketchInstance = new p5(sketch, sketchRef.current);
		}

		resizeTimeout = setTimeout(() => {
			let parentElement = document.querySelector('main[data-canvas]') as HTMLElement;
			if (parentElement) {
				sketchInstance.resizeCanvas(parentElement.offsetWidth, parentElement.offsetHeight);
			}
		}, 300);

		return () => {
			if (sketchInstance) {
				sketchInstance.remove();
			}
			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}
		};
	}, [location]);

	return <div ref={sketchRef}></div>;
};

export default Blob;
