// The entry file of your WebAssembly module.
import { Vector3 } from './math/Vector3';

export function test(): f32 {
	// const a = new Vector3(1, 1);
	// const b = new Vector3(2, 2);

	// return a.x + b.x;

	const t = new Vector3(1, 1);
	return t.x;
}
