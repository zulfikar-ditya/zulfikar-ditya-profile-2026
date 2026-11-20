import type { Camera, Look, Sky } from "@/content/stations";

/** The ride is drawn in a 1440 x 900 viewBox; the train's nose stays at `ANCHOR`. */
export const VIEW = { width: 1440, height: 900 };
export const ANCHOR = { x: 750, y: 835 };

/** World units between two stations, and how far past a board's centre the train stops. */
export const GAP = 1500;
export const STOP_OFFSET = 150;

/** Height in the view where a stop's text is centred. */
const TEXT_Y = 430;

export const skyColor: Record<Sky, string> = {
	paper: "var(--color-paper)",
	marigold: "var(--color-marigold)",
	red: "var(--color-red)",
	cobalt: "var(--color-cobalt)",
	green: "var(--color-green)",
};

type Vec = [number, number, number];

/** Centre of each look's text surface, relative to the stopped train's nose. */
export const focusOf: Record<Look, Vec> = {
	billboard: [-STOP_OFFSET, -120, 270],
	wide: [-STOP_OFFSET, -120, 225],
	wall: [40 - STOP_OFFSET, -255, 235],
};

export interface StageStop {
	id: string;
	label: string;
	sky: string;
	camera: Camera;
	focus: Vec;
}

/** Turn a point about the vertical axis, then project it: x runs down-right, y down-left, z up. */
export function project([x, y, z]: Vec, yaw: number): [number, number] {
	const angle = (yaw * Math.PI) / 180;
	const px = x * Math.cos(angle) - y * Math.sin(angle);
	const py = x * Math.sin(angle) + y * Math.cos(angle);
	return [px - py, (px + py) / 2 - z];
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * The camera between stop `a` and stop `b`, `t` of the way there. It eases
 * from one stop's framing to the next and pulls back a little mid-journey.
 * A yaw near 0 looks from the train's right, so the stop's text sits to the
 * right of the train; a yaw near -90 looks from its left, so the text sits to
 * the left. Going from one to the other swings the view round the train. The text surface of the
 * nearer stop is kept centred whatever the angle.
 */
export function cameraBetween(
	a: StageStop,
	b: StageStop,
	t: number,
	leg: number,
	portrait: boolean,
): { yaw: number; transform: string } {
	const eased = t * t * (3 - 2 * t);
	const arc = Math.sin(Math.PI * t);
	// A board seen at an in-between angle is wider than a phone screen, so portrait
	// only ever stops square-on to one side of the train or the other.
	const settle = (yaw: number) => (portrait ? Math.round(yaw / 90) * 90 : yaw);
	const from = settle(a.camera.yaw);
	const to = settle(b.camera.yaw);
	const sameSide = Math.abs(from - to) < 40;
	const sway = sameSide && !portrait ? (leg % 2 === 0 ? 8 : -8) * arc : 0;
	const yaw = mix(from, to, eased) + sway;
	const wanted = mix(a.camera.zoom, b.camera.zoom, eased) - 0.07 * arc;
	const zoom = portrait ? Math.min(1.06, Math.max(0.92, wanted)) : wanted;
	const focus: Vec = [
		mix(a.focus[0], b.focus[0], eased),
		mix(a.focus[1], b.focus[1], eased),
		mix(a.focus[2], b.focus[2], eased),
	];
	const [fx, fy] = project(focus, yaw);
	const cx = VIEW.width / 2;
	const cy = VIEW.height / 2;
	const x = cx - zoom * (ANCHOR.x + fx - cx) + mix(a.camera.x, b.camera.x, eased);
	const y = TEXT_Y - zoom * (ANCHOR.y + fy - cy) + mix(a.camera.y, b.camera.y, eased);

	return {
		yaw,
		transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${zoom.toFixed(4)}) translate(${-cx} ${-cy})`,
	};
}

/** The CSS variables the scene's faces read: the turn of the view and where the train is. */
export function sceneVars(yaw: number, trainX: number): Record<string, string> {
	const angle = (yaw * Math.PI) / 180;
	return {
		"--c": Math.cos(angle).toFixed(5),
		"--s": Math.sin(angle).toFixed(5),
		"--t": trainX.toFixed(1),
	};
}
