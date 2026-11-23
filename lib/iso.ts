export type Point = [number, number];

/** 2:1 isometric projection: x runs down-right, y down-left, z up. */
export function iso(x: number, y: number, z: number): Point {
	return [x - y, (x + y) / 2 - z];
}

export function points(corners: Point[]): string {
	return corners
		.map(([x, y]) => `${Math.round(x * 10) / 10},${Math.round(y * 10) / 10}`)
		.join(" ");
}

/** A flat quad at height z. */
export function quadZ(x0: number, x1: number, y0: number, y1: number, z: number): string {
	return points([iso(x0, y0, z), iso(x1, y0, z), iso(x1, y1, z), iso(x0, y1, z)]);
}

/** A quad on a wall of constant y (it faces down-left). */
export function quadY(x0: number, x1: number, y: number, z0: number, z1: number): string {
	return points([iso(x0, y, z1), iso(x1, y, z1), iso(x1, y, z0), iso(x0, y, z0)]);
}

/** A quad on a wall of constant x (it faces down-right). */
export function quadX(x: number, y0: number, y1: number, z0: number, z1: number): string {
	return points([iso(x, y0, z1), iso(x, y1, z1), iso(x, y1, z0), iso(x, y0, z0)]);
}

export interface Tone {
	top: string;
	left: string;
	right: string;
}

/** Three shades of one colour: lit top, left wall, darker right wall. */
export function tone(color: string): Tone {
	return {
		top: color,
		left: `color-mix(in srgb, ${color} 84%, black)`,
		right: `color-mix(in srgb, ${color} 66%, black)`,
	};
}
