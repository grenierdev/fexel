import { Vector2 } from './Vector2';

export class Box2 {
	public min: Vector2;
	public max: Vector2;

	constructor(
		min: Vector2 = new Vector2(-Infinity, -Infinity),
		max: Vector2 = new Vector2(+Infinity, +Infinity)
	) {
		this.min = min;
		this.max = max;
	}

	get isEmpty(): boolean {
		return this.max.x < this.min.x || this.max.y < this.min.y;
	}

	getCenter(target: Vector2): Vector2 {
		return this.isEmpty
			? target.set(0, 0)
			: target
					.copy(this.min)
					.add(this.max)
					.multiplyScalar(0.5);
	}

	getSize(target: Vector2): Vector2 {
		return this.isEmpty ? target.set(0, 0) : target.subVectors(this.max, this.min);
	}

	equals(box: Box2): boolean {
		return box.min.equals(this.min) && box.max.equals(this.max);
	}

	set(min: Vector2, max: Vector2): this {
		this.min.copy(min);
		this.max.copy(max);
		return this;
	}

	setFromPoints(points: Vector2[]): this {
		this.makeEmpty();
		for (let i = 0, l = points.length; i < l; ++i) {
			this.expandByPoint(points[i]);
		}
		return this;
	}

	setFromCenterAndSize(center: Vector2, size: Vector2): this {
		const halfSize = tv0.copy(size).multiplyScalar(0.5);
		this.min.copy(center).sub(halfSize);
		this.max.copy(center).add(halfSize);
		return this;
	}

	clone(): Box2 {
		return new Box2(this.min.clone(), this.max.clone());
	}

	makeEmpty(): this {
		this.min.x = this.min.y = +Infinity;
		this.max.x = this.max.y = -Infinity;
		return this;
	}

	expandByPoint(point: Vector2): this {
		this.min.min(point);
		this.max.max(point);
		return this;
	}

	expandByVector(vector: Vector2): this {
		this.min.sub(vector);
		this.max.add(vector);
		return this;
	}

	expandByScalar(scalar: f32): this {
		this.min.addScalar(-scalar);
		this.max.addScalar(scalar);
		return this;
	}

	containsPoint(point: Vector2): boolean {
		return point.x < this.min.x ||
			point.x > this.max.x ||
			point.y < this.min.y ||
			point.y > this.max.y
			? false
			: true;
	}

	containsBox(box: Box2): boolean {
		return (
			this.min.x <= box.min.x &&
			box.max.x <= this.max.x &&
			this.min.y <= box.min.y &&
			box.max.y <= this.max.y
		);
	}

	intersectsBox(box: Box2): boolean {
		return box.max.x < this.min.x ||
			box.min.x > this.max.x ||
			box.max.y < this.min.y ||
			box.min.y > this.max.y
			? false
			: true;
	}

	clampPoint(point: Vector2, target: Vector2): Vector2 {
		return target.copy(point).clamp(this.min, this.max);
	}

	distanceToPoint(point: Vector2): f32 {
		const clampedPoint = tv0.copy(point).clamp(this.min, this.max);
		return clampedPoint.sub(point).length;
	}

	intersection(box: Box2): this {
		this.min.max(box.min);
		this.max.min(box.max);
		return this;
	}

	union(box: Box2): this {
		this.min.min(box.min);
		this.max.max(box.max);
		return this;
	}

	translate(offset: Vector2): this {
		this.min.add(offset);
		this.max.add(offset);
		return this;
	}
}

const tv0 = new Vector2();
