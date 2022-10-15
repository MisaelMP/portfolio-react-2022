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
  len: Number;
  strength: Number;
  update: Function;
  draw: Function;
}

export type { JointParams, PointParams };
