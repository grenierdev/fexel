import { clamp } from './util';
import { Matrix4 } from './Matrix4';

export class Vector4 {
	public x: f32;
	public y: f32;
	public z: f32;
	public w: f32;

	constructor(x: f32 = 0, y: f32 = 0, z: f32 = 0, w: f32 = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	get length(): f32 {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}

	get lengthSquared(): f32 {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}

	get lengthManhattan(): f32 {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}

	equals(vector: Vector4): boolean {
		return this.x === vector.x && this.y === vector.y && this.z === vector.z && this.w === vector.w;
	}

	set(x = 0, y = 0, z = 0, w = 0): this {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		return this;
	}

	setScalar(scalar: f32): this {
		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
		this.w = scalar;
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

	setW(w: f32): this {
		this.w = w;
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
		this.w = -this.w;
		return this;
	}

	clone(): Vector4 {
		return new Vector4(this.x, this.y, this.z, this.w);
	}

	copy(vector: Vector4): this {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
		this.w = vector.w;
		return this;
	}

	add(vector: Vector4): this {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;
		this.w += vector.w;
		return this;
	}

	addVectors(a: Vector4, b: Vector4): this {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;
		return this;
	}

	addScalar(x: f32, y = x, z = x, w = x): this {
		this.x += x;
		this.y += y;
		this.z += z;
		this.w += w;
		return this;
	}

	sub(vector: Vector4): this {
		this.x -= vector.x;
		this.y -= vector.y;
		this.w -= vector.z;
		this.w -= vector.w;
		return this;
	}

	subVectors(a: Vector4, b: Vector4): this {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;
		return this;
	}

	subScalar(x: f32, y = x, z = x, w = x): this {
		this.x -= x;
		this.y -= y;
		this.z -= z;
		this.w -= w;
		return this;
	}

	multiply(vector: Vector4): this {
		this.x *= vector.x;
		this.y *= vector.y;
		this.z *= vector.z;
		this.w *= vector.w;
		return this;
	}

	multiplyVectors(a: Vector4, b: Vector4): this {
		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;
		this.w = a.w * b.w;
		return this;
	}

	multiplyScalar(x: f32, y = x, z = x, w = x): this {
		this.x *= x;
		this.y *= y;
		this.z *= z;
		this.w *= w;
		return this;
	}

	divide(vector: Vector4): this {
		this.x /= vector.x;
		this.y /= vector.y;
		this.z /= vector.z;
		this.w /= vector.w;
		return this;
	}

	divideVectors(a: Vector4, b: Vector4): this {
		this.x = a.x / b.x;
		this.y = a.y / b.y;
		this.z = a.z / b.z;
		this.w = a.w / b.w;
		return this;
	}

	divideScalar(x: f32, y = x, z = x, w = x): this {
		this.x /= x;
		this.y /= y;
		this.z /= z;
		this.w /= w;
		return this;
	}

	min(vector: Vector4): this {
		this.x = Math.min(this.x, vector.x);
		this.y = Math.min(this.y, vector.y);
		this.z = Math.min(this.z, vector.z);
		this.w = Math.min(this.w, vector.w);
		return this;
	}

	max(vector: Vector4): this {
		this.x = Math.max(this.x, vector.x);
		this.y = Math.max(this.y, vector.y);
		this.z = Math.max(this.z, vector.z);
		this.w = Math.max(this.w, vector.w);
		return this;
	}

	clamp(min: Vector4, max: Vector4): this {
		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		this.z = Math.max(min.z, Math.min(max.z, this.z));
		this.w = Math.max(min.w, Math.min(max.w, this.w));
		return this;
	}

	clampLength(min: f32, max: f32): this {
		const length = this.length;
		return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
	}

	project(normal: Vector4): this {
		return this.multiplyScalar(normal.dot(this) / normal.lengthSquared);
	}

	reflect(normal: Vector4): this {
		return this.sub(tmp.copy(normal).multiplyScalar(2 * this.dot(normal)));
	}

	dot(vector: Vector4): f32 {
		return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
	}

	// cross(vector: Vector4) {
	// 	const ax = this.x;
	// 	const bx = vector.x;
	// 	const ay = this.y;
	// 	const by = vector.y;
	// 	const az = this.z;
	// 	const bz = vector.z;
	// 	// const aw = this.w;
	// 	// const bw = vector.w;

	// 	this.x = ay * bz - az * by;
	// 	this.y = az * bx - ax * bz;
	// 	this.z = ax * by - ay * bx;
	// 	return this;
	// }

	angleTo(vector: Vector4): f32 {
		const theta = this.dot(vector) / Math.sqrt(this.lengthSquared * vector.lengthSquared);
		return Math.acos(clamp(theta, -1, 1));
	}

	distanceTo(vector: Vector4): f32 {
		return Math.sqrt(this.distanceToSquared(vector));
	}

	distanceToSquared(vector: Vector4): f32 {
		const dx = this.x - vector.x;
		const dy = this.y - vector.y;
		const dz = this.z - vector.z;
		const dw = this.w - vector.w;
		return dx * dx + dy * dy + dz * dz + dw * dw;
	}

	manhattanDistanceTo(vector: Vector4): f32 {
		return (
			Math.abs(this.x - vector.x) +
			Math.abs(this.y - vector.y) +
			Math.abs(this.z - vector.z) +
			Math.abs(this.w - vector.w)
		);
	}

	applyMatrix4(matrix: Matrix4): this {
		const x = this.x;
		const y = this.y;
		const z = this.z;
		const w = this.w;
		const me = matrix.elements;

		this.x = me[0] * x + me[4] * y + me[8] * z + me[12] * w;
		this.y = me[1] * x + me[5] * y + me[9] * z + me[13] * w;
		this.z = me[2] * x + me[6] * y + me[10] * z + me[14] * w;
		this.w = me[3] * x + me[7] * y + me[11] * z + me[15] * w;

		return this;
	}
}

const tmp = new Vector4();
