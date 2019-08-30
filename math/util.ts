export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;

export function clamp(value: f32, min: f32, max: f32): f32 {
	return Math.max(min, Math.min(max, value));
}

/**
 * https://en.wikipedia.org/wiki/Modulo_operation
 */
export function euclideanModulo(n: f32, m: f32): f32 {
	return ((n % m) + m) % m;
}

export function mapLinear(a1: f32, a2: f32, b1: f32, b2: f32, t: f32): f32 {
	return b1 + ((t - a1) * (b2 - b1)) / (a2 - a1);
}

/**
 * https://en.wikipedia.org/wiki/Linear_interpolation
 */
export function lerp(from: f32, to: f32, t: f32): f32 {
	return (1 - t) * from + t * to;
}

/**
 * http://en.wikipedia.org/wiki/Smoothstep
 */
export function smoothstep(value: f32, min: f32, max: f32): f32 {
	if (value <= min) return 0;
	if (value >= max) return 1;
	value = (value - min) / (max - min);
	return value * value * (3 - 2 * value);
}

export function smootherstep(value: f32, min: f32, max: f32): f32 {
	if (value <= min) return 0;
	if (value >= max) return 1;
	value = (value - min) / (max - min);
	return value * value * value * (value * (value * 6 - 15) + 10);
}

export function randomInt(low: f32, high: f32): f32 {
	return low + Math.floor(Math.random() * (high - low + 1));
}

export function randomFloat(low: f32, high: f32): f32 {
	return low + Math.random() * (high - low);
}

export function randFloatSpread(range: f32): f32 {
	return range * (0.5 - Math.random());
}

export function degToRad(degrees: f32): f32 {
	return degrees * DEG2RAD;
}

export function radToDeg(radians: f32): f32 {
	return radians * RAD2DEG;
}

export function isPowerOfTwo(value: f32): boolean {
	return (value & (value - 1)) === 0 && value !== 0;
}

export function ceilPowerOfTwo(value: f32): f32 {
	return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}

export function floorPowerOfTwo(value: f32): f32 {
	return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}
