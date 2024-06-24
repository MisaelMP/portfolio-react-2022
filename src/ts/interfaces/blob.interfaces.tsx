interface PointParams {
  x: number;
  y: number;
  damping?: number;
  friction?: number;
  radius?: number;
  parent?: HTMLElement;
  color?: number;
  addForce: Function;
  attract: Function;
  repel: Function;
  collide: Function;
  constrain: Function;
  update: Function;
  draw: Function;
  delayedx?: number;
  delayedy?: number;
  oldx?: number;
  oldy?: number;
  originalRadius?: number;
}
interface JointParams {
  pointA: PointParams | [];
  pointB: PointParams | [];
  len: number;
  strength: number;
  update: Function;
  draw: Function;
}

  interface Point {
		x: number;
		y: number;
		oldx: number;
		oldy: number;
		nextx: number;
		nexty: number;
		delayedx: number;
		delayedy: number;
		radius: number;
		originalRadius: number;
		damping: number;
		friction: number;
		parent: any;
		maxVelocity: number;
		color: number;
		addForce(x: number, y: number, instant?: boolean): void;
		attract(otherX: number, otherY: number, strength?: number): void;
		repel(otherX: number, otherY: number, radius?: number, strength?: number): { x: number; y: number } | null;
		collide(otherX: number, otherY: number, radius: number): void;
		constrain(left: number, top: number, right: number, bottom: number): void;
		update(dt?: number): void;
		draw(ctx: any): void;
	}

	interface Joint {
		pointA: Point;
		pointB: Point;
		originalLen: number;
		len: number;
		strength: number;
		update(dt?: number): void;
		draw(ctx: any): void;
	}

export type { JointParams, PointParams, Point, Joint};
