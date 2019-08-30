import { Vector3 } from './Vector3';
import { Sphere } from './Sphere';
import { Line3 } from './Line3';
import { Box3 } from './Box3';

export class Plane {
	public normal: Vector3;
	public constant: f32;

	constructor(normal: Vector3 = new Vector3(1, 0, 0), constant: f32 = 0) {
		this.normal = normal;
		this.constant = constant;
	}

	equals(plane: Plane): boolean {
		return this.normal.equals(plane.normal) && this.constant === plane.constant;
	}

	set(normal: Vector3, constant: f32): this {
		this.normal.copy(normal);
		this.constant = constant;
		return this;
	}

	setFromComponents(x: f32, y: f32, z: f32, w: f32): this {
		this.normal.set(x, y, z);
		this.constant = w;
		return this;
	}

	setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3): this {
		this.normal.copy(normal);
		this.constant = -point.dot(this.normal);
		return this;
	}

	setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): this {
		const normal = v0
			.subVectors(c, b)
			.cross(v1.subVectors(a, b))
			.normalize();
		this.setFromNormalAndCoplanarPoint(normal, a);
		return this;
	}

	clone(): Plane {
		return new Plane(this.normal.clone(), this.constant);
	}

	copy(plane: Plane): this {
		this.normal.copy(plane.normal);
		this.constant = plane.constant;
		return this;
	}

	normalize(): this {
		const invNormalLength = 1.0 / this.normal.length;
		this.normal.multiplyScalar(invNormalLength);
		this.constant *= invNormalLength;
		return this;
	}

	negate(): this {
		this.normal.negate();
		this.constant *= -1;
		return this;
	}

	distanceToPoint(point: Vector3): f32 {
		return this.normal.dot(point) + this.constant;
	}

	distanceToSphere(sphere: Sphere): f32 {
		return this.distanceToPoint(sphere.center) - sphere.radius;
	}

	projectPoint(point: Vector3, target: Vector3): Vector3 {
		return target
			.copy(this.normal)
			.multiplyScalar(-this.distanceToPoint(point))
			.add(point);
	}

	lineIntersection(line: Line3, target: Vector3): Vector3 {
		const direction = line.delta(v0);
		const denominator = this.normal.dot(direction);
		if (denominator === 0) {
			if (this.distanceToPoint(line.start) === 0) {
				return target.copy(line.start);
			}
			throw new RangeError(`Line does not intersect this plane. Check Plane.intersectsLine first.`);
		}

		const t = -(line.start.dot(this.normal) + this.constant) / denominator;
		if (t < 0 || t > 1) {
			throw new RangeError(`Line does not intersect this plane. Check Plane.intersectsLine first.`);
		}
		return target
			.copy(direction)
			.multiplyScalar(t)
			.add(line.start);
	}

	intersectsLine(line: Line3): boolean {
		const startSign = this.distanceToPoint(line.start);
		const endSign = this.distanceToPoint(line.end);
		return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);
	}

	intersectsBox(box: Box3): boolean {
		return box.intersectsPlane(this);
	}

	intersectsSphere(sphere: Sphere): boolean {
		return sphere.intersectsPlane(this);
	}

	coplanarPoint(target: Vector3): Vector3 {
		return target.copy(this.normal).multiplyScalar(-this.constant);
	}

	translate(offset: Vector3): this {
		this.constant -= offset.dot(this.normal);
		return this;
	}
}

const v0 = new Vector3();
const v1 = new Vector3();
