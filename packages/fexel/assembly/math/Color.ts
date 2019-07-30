export class Color {
	public r: f32;
	public g: f32;
	public b: f32;
	public a: f32;

	constructor(r: f32 = 0, g: f32 = 0, b: f32 = 0, a: f32 = 1) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	equals(color: Color): boolean {
		return this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a;
	}

	clone(): Color {
		return new Color(this.r, this.g, this.b, this.a);
	}

	static readonly White: Color = new Color(1, 1, 1);
	static readonly Black: Color = new Color(0, 0, 0);
}
