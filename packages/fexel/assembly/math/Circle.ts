import { Vector2 } from './Vector2';
import { Box2 } from './Box2';

export class Circle {
	public center: Vector2;
	public radius: f32;

	constructor(center: Vector2 = new Vector2(), radius: f32 = 0) {
		this.center = center;
		this.radius = radius;
	}

	get isEmpty(): boolean {
		return this.radius < 0;
	}

	equals(sphere: Circle): boolean {
		return this.center.equals(sphere.center) && this.radius === sphere.radius;
	}

	set(center: Vector2, radius: f32): this {
		this.center.copy(center);
		this.radius = radius;
		return this;
	}

	setFromPoints(points: Vector2[]): this {
		const center = tb0.setFromPoints(points).getCenter(this.center);

		let maxRadius = 0;
		for (let i = 0, l = points.length; i < l; ++i) {
			maxRadius = Math.max(maxRadius, center.distanceToSquared(points[i]));
		}
		this.radius = Math.sqrt(maxRadius);

		return this;
	}

	clone(): Circle {
		return new Circle(this.center.clone(), this.radius);
	}

	copy(circle: Circle): this {
		this.center.copy(circle.center);
		this.radius = circle.radius;
		return this;
	}

	containsPoint(point: Vector2): boolean {
		const r = this.radius;
		return point.distanceToSquared(this.center) <= r * r;
	}

	distanceToPoint(point: Vector2): f32 {
		return point.distanceTo(this.center) - this.radius;
	}

	intersectsCircle(circle: Circle): boolean {
		const s = this.radius + circle.radius;
		return circle.center.distanceToSquared(this.center) <= s * s;
	}

	// intersectsBox(box: Box2 | ReadonlyBox2) {
	// 	return box.intersectsCircle(this);
	// }

	// intersectsPlane(plane: Plane | ReadonlyPlane) {
	// 	return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
	// }

	clampPoint(point: Vector2, target: Vector2): Vector2 {
		const r = this.radius;
		const c = this.center;
		const deltaLengthSq = c.distanceToSquared(point);
		target.copy(point);
		if (deltaLengthSq > r * r) {
			target
				.sub(c)
				.normalize()
				.multiplyScalar(r)
				.add(c);
		}
		return target;
	}

	getBoundingBox(target: Box2): Box2 {
		target.set(this.center, this.center);
		target.expandByScalar(this.radius);
		return target;
	}

	translate(offset: Vector2): this {
		this.center.add(offset);
		return this;
	}

	makeEmpty(): this {
		this.radius = 0;
		return this;
	}
}

const tb0 = new Box2();
