import { Vector3 } from './Vector3';
import { Plane } from './Plane';
import { Box3 } from './Box3';

export class Sphere {
	public center: Vector3;
	public radius: f32;

	constructor(center: Vector3 = new Vector3(), radius: f32 = 0) {
		this.center = center;
		this.radius = radius;
	}

	get isEmpty(): boolean {
		return this.radius < 0;
	}

	equals(sphere: Sphere): boolean {
		return this.center.equals(sphere.center) && this.radius === sphere.radius;
	}

	set(center: Vector3, radius: f32): this {
		this.center.copy(center);
		this.radius = radius;
		return this;
	}

	setFromPoints(points: (Vector3)[]): this {
		const center = tb0.setFromPoints(points).getCenter(this.center);

		let maxRadius = 0;
		for (let i = 0, l = points.length; i < l; ++i) {
			maxRadius = Math.max(maxRadius, center.distanceToSquared(points[i]));
		}
		this.radius = Math.sqrt(maxRadius);

		return this;
	}

	clone(): Sphere {
		return new Sphere(this.center.clone(), this.radius);
	}

	copy(sphere: Sphere): this {
		this.center.copy(sphere.center);
		this.radius = sphere.radius;
		return this;
	}

	containsPoint(point: Vector3): boolean {
		const r = this.radius;
		return point.distanceToSquared(this.center) <= r * r;
	}

	distanceToPoint(point: Vector3): f32 {
		return point.distanceTo(this.center) - this.radius;
	}

	intersectsSphere(sphere: Sphere): boolean {
		const s = this.radius + sphere.radius;
		return sphere.center.distanceToSquared(this.center) <= s * s;
	}

	intersectsBox(box: Box3): boolean {
		return box.intersectsSphere(this);
	}

	intersectsPlane(plane: Plane): boolean {
		return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
	}

	clampPoint(point: Vector3, target: Vector3): Vector3 {
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

	getBoundingBox(target: Box3): Box3 {
		target.set(this.center, this.center);
		target.expandByScalar(this.radius);
		return target;
	}

	translate(offset: Vector3): this {
		this.center.add(offset);
		return this;
	}

	makeEmpty(): this {
		this.radius = 0;
		return this;
	}
}

const tb0 = new Box3();
