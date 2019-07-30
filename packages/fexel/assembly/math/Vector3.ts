import { clamp } from './util';
import { Matrix4 } from './Matrix4';
import { Quaterion } from './Quaterion';
import { Matrix3 } from './Matrix3';

export class Vector3 {
	public x: f32;
	public y: f32;
	public z: f32;

	constructor(x: f32 = 0, y: f32 = 0, z: f32 = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	get length(): f32 {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	get lengthSquared(): f32 {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}

	get lengthManhattan(): f32 {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}

	equals(vector: Vector3): boolean {
		return this.x === vector.x && this.y === vector.y && this.z === vector.z;
	}

	set(x = 0, y = 0, z = 0): this {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	setScalar(scalar: f32): this {
		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
		return this;
	}

	setX(x: f32): this {
		this.x = x;
		return this;
	}

	setY(y: f32): this {
		this.y = y;
		return this;
	}

	setZ(z: f32): this {
		this.z = z;
		return this;
	}

	setLength(length: f32): this {
		return this.normalize().multiplyScalar(length);
	}

	normalize(): this {
		return this.divideScalar(this.length || 1);
	}

	negate(): this {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this;
	}

	clone(): Vector3 {
		return new Vector3(this.x, this.y, this.z);
	}

	copy(vector: Vector3): this {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
		return this;
	}

	add(vector: Vector3): this {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;
		return this;
	}

	addVectors(a: Vector3, b: Vector3): this {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		return this;
	}

	addScalar(x: f32, y = x, z = x): this {
		this.x += x;
		this.y += y;
		this.z += z;
		return this;
	}

	sub(vector: Vector3): this {
		this.x -= vector.x;
		this.y -= vector.y;
		this.z -= vector.z;
		return this;
	}

	subVectors(a: Vector3, b: Vector3): this {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		return this;
	}

	subScalar(x: f32, y = x, z = x): this {
		this.x -= x;
		this.y -= y;
		this.z -= z;
		return this;
	}

	multiply(vector: Vector3): this {
		this.x *= vector.x;
		this.y *= vector.y;
		this.z *= vector.z;
		return this;
	}

	multiplyVectors(a: Vector3, b: Vector3): this {
		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;
		return this;
	}

	multiplyScalar(x: f32, y = x, z = x): this {
		this.x *= x;
		this.y *= y;
		this.z *= z;
		return this;
	}

	divide(vector: Vector3): this {
		this.x /= vector.x;
		this.y /= vector.y;
		this.z /= vector.z;
		return this;
	}

	divideVectors(a: Vector3, b: Vector3): this {
		this.x = a.x / b.x;
		this.y = a.y / b.y;
		this.z = a.z / b.z;
		return this;
	}

	divideScalar(x: f32, y = x, z = x): this {
		this.x /= x;
		this.y /= y;
		this.z /= z;
		return this;
	}

	min(vector: Vector3): this {
		this.x = Math.min(this.x, vector.x);
		this.y = Math.min(this.y, vector.y);
		this.z = Math.min(this.z, vector.z);
		return this;
	}

	max(vector: Vector3): this {
		this.x = Math.max(this.x, vector.x);
		this.y = Math.max(this.y, vector.y);
		this.z = Math.max(this.z, vector.z);
		return this;
	}

	clamp(min: Vector3, max: Vector3): this {
		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		this.z = Math.max(min.z, Math.min(max.z, this.z));
		return this;
	}

	clampLength(min: f32, max: f32): this {
		const length = this.length;
		return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
	}

	project(normal: Vector3): this {
		return this.multiplyScalar(normal.dot(this) / normal.lengthSquared);
	}

	reflect(normal: Vector3): this {
		return this.sub(tmp.copy(normal).multiplyScalar(2 * this.dot(normal)));
	}

	dot(vector: Vector3): f32 {
		return this.x * vector.x + this.y * vector.y + this.z * vector.z;
	}

	cross(vector: Vector3): this {
		return this.crossVectors(this, vector);
	}

	crossVectors(a: Vector3, b: Vector3): this {
		const ax = a.x;
		const bx = b.x;
		const ay = a.y;
		const by = b.y;
		const az = a.z;
		const bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;
		return this;
	}

	angleTo(vector: Vector3): f32 {
		const theta = this.dot(vector) / Math.sqrt(this.lengthSquared * vector.lengthSquared);
		return Math.acos(clamp(theta, -1, 1));
	}

	distanceTo(vector: Vector3): f32 {
		return Math.sqrt(this.distanceToSquared(vector));
	}

	distanceToSquared(vector: Vector3): f32 {
		const dx = this.x - vector.x;
		const dy = this.y - vector.y;
		const dz = this.z - vector.z;
		return dx * dx + dy * dy + dz * dz;
	}

	manhattanDistanceTo(vector: Vector3): f32 {
		return Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y) + Math.abs(this.z - vector.z);
	}

	applyMatrix3(matrix: Matrix3): this {
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const me = matrix.elements;

		this.x = me[0] * x + me[3] * y + me[6] * z;
		this.y = me[1] * x + me[4] * y + me[7] * z;
		this.z = me[2] * x + me[5] * y + me[8] * z;

		return this;
	}

	applyMatrix4(matrix: Matrix4): this {
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const me = matrix.elements;

		const w = 1 / (me[3] * x + me[7] * y + me[11] * z + me[15]);

		this.x = (me[0] * x + me[4] * y + me[8] * z + me[12]) * w;
		this.y = (me[1] * x + me[5] * y + me[9] * z + me[13]) * w;
		this.z = (me[2] * x + me[6] * y + me[10] * z + me[14]) * w;

		return this;
	}

	applyQuaternion(quaterion: Quaterion): this {
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const qx = quaterion.x;
		const qy = quaterion.y;
		const qz = quaterion.z;
		const qw = quaterion.w;

		const ix = qw * x + qy * z - qz * y;
		const iy = qw * y + qz * x - qx * z;
		const iz = qw * z + qx * y - qy * x;
		const iw = -qx * x - qy * y - qz * z;

		this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return this;
	}

	static readonly One: Vector3 = new Vector3(1, 1, 1);
	static readonly Zero: Vector3 = new Vector3(0, 0, 0);
	static readonly Right: Vector3 = new Vector3(1, 0, 0);
	static readonly Up: Vector3 = new Vector3(0, 1, 0);
	static readonly Forward: Vector3 = new Vector3(0, 0, 1);
}

const tmp = new Vector3();
