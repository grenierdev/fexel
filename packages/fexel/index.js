const fs = require('fs');
const memory = new WebAssembly.Memory({ initial: 32767, max: 100000 });
const compiled = new WebAssembly.Module(fs.readFileSync(__dirname + '/build/optimized.wasm'));
const imports = {
	env: {
		memory,
		abort(_msg, _file, line, column) {
			console.error('abort called at index.ts:' + line + ':' + column);
		},
	},
};
Object.defineProperty(module, 'exports', {
	get: () => new WebAssembly.Instance(compiled, imports).exports,
});
