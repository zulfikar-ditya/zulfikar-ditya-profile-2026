import type { CSSProperties, ReactNode } from "react";
import type { Board, Look } from "@/content/stations";
import { tone, type Tone } from "@/lib/iso";
import { ANCHOR, GAP } from "./config";

export interface RideStop {
	id: string;
	board: Board;
	look: Look;
	accent: string;
	/** One building per job, standing in the stretch before the station. */
	buildings: { kind: "tower" | "office" | "shop" | "school" | "lab" }[];
}

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const paper = tone("var(--color-white)");
const ground: Tone = {
	top: "var(--color-asphalt)",
	left: "color-mix(in srgb, var(--color-asphalt) 62%, black)",
	right: "color-mix(in srgb, var(--color-asphalt) 44%, black)",
};
const boardTone: Tone = {
	top: "color-mix(in srgb, var(--color-ink) 78%, white)",
	left: "var(--color-ink)",
	right: "color-mix(in srgb, var(--color-ink) 88%, white)",
};

/**
 * One flat face of the world, drawn in its own flat coordinates. `x`, `y`, `z`
 * are the world position of its top-left corner; the `.f-*` rules in
 * globals.css skew it onto its plane for the current view. Children are drawn
 * on the face, in the same flat coordinates.
 */
function Face({
	plane,
	x,
	y,
	z,
	width,
	height,
	fill,
	children,
}: {
	plane: "top" | "y" | "x" | "xr";
	x: number;
	y: number;
	z: number;
	width: number;
	height: number;
	fill: string;
	children?: ReactNode;
}) {
	return (
		<g className={`f f-${plane}`} style={{ "--x": x, "--y": y, "--z": z } as Vars}>
			<rect width={width} height={height} fill={fill} stroke={fill} strokeWidth={0.75} />
			{children}
		</g>
	);
}

/**
 * A box, as its top and the walls the camera can see: the wall facing
 * down-left, and one end wall (CSS shows the right end or the left end,
 * depending on which way the view has swung). `front`, `side` and `rear` are
 * drawn on those walls.
 */
function Box({
	x0,
	x1,
	y0,
	y1,
	z0,
	z1,
	fill,
	front,
	side,
	rear,
}: {
	x0: number;
	x1: number;
	y0: number;
	y1: number;
	z0: number;
	z1: number;
	fill: Tone;
	front?: ReactNode;
	side?: ReactNode;
	rear?: ReactNode;
}) {
	return (
		<>
			<Face plane="top" x={x0} y={y0} z={z1} width={x1 - x0} height={y1 - y0} fill={fill.top} />
			<Face plane="y" x={x0} y={y1} z={z1} width={x1 - x0} height={z1 - z0} fill={fill.left}>
				{front}
			</Face>
			<Face plane="x" x={x1} y={y1} z={z1} width={y1 - y0} height={z1 - z0} fill={fill.right}>
				{side}
			</Face>
			<Face plane="xr" x={x0} y={y0} z={z1} width={y1 - y0} height={z1 - z0} fill={fill.right}>
				{rear}
			</Face>
		</>
	);
}

/** Rows of windows for a wall of the given size, as one path in the wall's flat coordinates. */
function windows(width: number, height: number): string {
	const panes: string[] = [];

	for (let z = 34; z + 30 < height; z += 52) {
		for (let u = 16; u + 22 <= width - 10; u += 36) {
			panes.push(`M${u} ${height - z - 30}h22v30h-22Z`);
		}
	}

	return panes.join("");
}

/** Something that stands on the ground. Its footprint decides what it is drawn in front of. */
function Thing({
	x0,
	x1,
	y0,
	y1,
	rises,
	children,
}: {
	x0: number;
	x1: number;
	y0: number;
	y1: number;
	rises?: number;
	children: ReactNode;
}) {
	return (
		<g
			className={rises === undefined ? "ride-thing" : "ride-thing ride-rise"}
			data-box={`${x0} ${x1} ${y0} ${y1}`}
			data-x={rises}
		>
			{children}
		</g>
	);
}

const buildingShape = {
	tower: { width: 150, depth: 110, height: 400, roof: "var(--color-cobalt)" },
	office: { width: 170, depth: 110, height: 260, roof: "var(--color-red)" },
	shop: { width: 160, depth: 100, height: 120, roof: "var(--color-marigold)" },
	school: { width: 150, depth: 100, height: 150, roof: "var(--color-red)" },
	lab: { width: 150, depth: 110, height: 500, roof: "var(--color-green)" },
};

function Building({
	kind,
	x,
	y,
	variant,
}: {
	kind: RideStop["buildings"][number]["kind"];
	x: number;
	y: number;
	variant: number;
}) {
	const shape = buildingShape[kind];
	const height = shape.height + (variant % 3) * 36;
	const x0 = x - shape.width / 2;
	const x1 = x + shape.width / 2;
	const y0 = y - shape.depth;
	const lit = kind === "lab" ? "var(--color-green)" : "var(--color-ink)";

	return (
		<Thing x0={x0} x1={x1} y0={y0} y1={y} rises={x}>
			<Box
				x0={x0}
				x1={x1}
				y0={y0}
				y1={y}
				z0={0}
				z1={height}
				fill={paper}
				front={<path d={windows(shape.width, height)} fill={lit} />}
				side={<path d={windows(shape.depth, height)} fill={lit} opacity={0.7} />}
				rear={<path d={windows(shape.depth, height)} fill={lit} opacity={0.7} />}
			/>
			<Box
				x0={x0 + 24}
				x1={x1 - 24}
				y0={y0 + 20}
				y1={y - 20}
				z0={height}
				z1={height + 22}
				fill={tone(shape.roof)}
			/>
			{kind === "shop" && (
				<Box x0={x0} x1={x1} y0={y} y1={y + 26} z0={76} z1={84} fill={tone(shape.roof)} />
			)}
			{(kind === "lab" || kind === "tower") && (
				<Box
					x0={x - 4}
					x1={x + 4}
					y0={y0 + 50}
					y1={y0 + 58}
					z0={height + 22}
					z1={height + 110}
					fill={tone(shape.roof)}
				/>
			)}
		</Thing>
	);
}

/** A trackside signal: the scenery between two stations. */
function Signal({ x, y }: { x: number; y: number }) {
	return (
		<Thing x0={x - 14} x1={x + 14} y0={y - 9} y1={y + 9}>
			<Box x0={x - 5} x1={x + 5} y0={y - 5} y1={y + 5} z0={0} z1={150} fill={boardTone} />
			<Box
				x0={x - 14}
				x1={x + 14}
				y0={y - 9}
				y1={y + 9}
				z0={150}
				z1={236}
				fill={boardTone}
				front={
					<>
						<rect x={7} y={14} width={14} height={20} fill="var(--color-red)" />
						<rect x={7} y={50} width={14} height={20} fill="var(--color-marigold)" />
					</>
				}
			/>
		</Thing>
	);
}

/**
 * The words at a stop, in the flat coordinates of the surface they are printed
 * on: a kicker, an optional big value, the caption, then one line of specifics.
 */
function BoardText({
	board,
	accent,
	color,
	quiet,
	bigSize,
}: {
	board: Board;
	accent: string;
	color: string;
	quiet: string;
	bigSize: number;
}) {
	const big = board.big ?? [];
	const counted = /^(\d+(?:\.\d+)?)(%?)$/.exec(big[0] ?? "");
	const counts = counted !== null && big.length === 1 && !/^\d{4}$/.test(big[0]);
	const lineSize = big.length > 0 ? 29 : 31;
	const lineStep = Math.round(lineSize * 1.38);
	const bigStep = Math.round(bigSize * 0.98);
	const lastBig = big.length > 0 ? 62 + big.length * bigStep : 58;
	const firstLine = lastBig + (big.length > 0 ? 56 : 62);
	const noteLine = firstLine + (board.lines.length - 1) * lineStep + 44;

	return (
		<>
			<text x={34} y={58} fontSize={27} className="font-sans font-semibold" fill={color}>
				{board.kicker}
			</text>
			{big.map((word, i) => (
				<text
					key={word}
					x={30}
					y={62 + (i + 1) * bigStep}
					fontSize={bigSize}
					className={counts ? "font-display ride-count" : "font-display"}
					data-value={counts ? counted[1] : undefined}
					data-suffix={counts ? counted[2] : undefined}
					fill={accent}
				>
					{word}
				</text>
			))}
			{board.lines.map((line, i) => (
				<text
					key={line}
					x={34}
					y={firstLine + i * lineStep}
					fontSize={lineSize}
					className="font-sans font-semibold"
					fill={color}
				>
					{line}
				</text>
			))}
			<text x={34} y={noteLine} fontSize={21} className="font-sans font-bold" fill={quiet}>
				{board.note}
			</text>
		</>
	);
}

const BOARD_Y = -120;
const BOARD_DEPTH = 16;

const boardShape = {
	billboard: {
		half: 290,
		z0: 60,
		z1: 480,
		fill: boardTone,
		text: "var(--color-paper)",
		quiet: "var(--color-steel)",
	},
	wide: {
		half: 330,
		z0: 50,
		z1: 410,
		fill: { top: paper.top, left: paper.top, right: paper.right },
		text: "var(--color-ink)",
		quiet: "var(--color-asphalt)",
	},
};

/** A board behind the platform, with the stop's words printed on its face. */
function StationBoard({
	x,
	board,
	look,
	accent,
}: {
	x: number;
	board: Board;
	look: "billboard" | "wide";
	accent: string;
}) {
	const shape = boardShape[look];

	return (
		<Thing x0={x - shape.half} x1={x + shape.half} y0={BOARD_Y - BOARD_DEPTH} y1={BOARD_Y}>
			<g data-x={x}>
				{[x - shape.half + 50, x + shape.half - 66].map((post) => (
					<Box
						key={post}
						x0={post}
						x1={post + 16}
						y0={BOARD_Y - BOARD_DEPTH}
						y1={BOARD_Y}
						z0={0}
						z1={shape.z0}
						fill={boardTone}
					/>
				))}
				<Box
					x0={x - shape.half}
					x1={x + shape.half}
					y0={BOARD_Y - BOARD_DEPTH}
					y1={BOARD_Y}
					z0={shape.z0}
					z1={shape.z1}
					fill={shape.fill}
					front={
						<BoardText
							board={board}
							accent={look === "wide" ? "var(--color-red)" : accent}
							color={shape.text}
							quiet={shape.quiet}
							bigSize={(board.big?.length ?? 0) > 1 ? 86 : 150}
						/>
					}
				/>
			</g>
		</Thing>
	);
}

const WALL = { x0: -140, x1: 40, y0: -440, y1: -70, height: 470 };

/** The same words lettered on the side of a building, on the wall that faces down-right. */
function WallBoard({ x, board }: { x: number; board: Board }) {
	const x0 = x + WALL.x0;
	const x1 = x + WALL.x1;

	return (
		<Thing x0={x0} x1={x1} y0={WALL.y0} y1={WALL.y1}>
			<g data-x={x}>
				<Box
					x0={x0}
					x1={x1}
					y0={WALL.y0}
					y1={WALL.y1}
					z0={0}
					z1={WALL.height}
					fill={{ top: paper.top, left: paper.right, right: paper.top }}
					front={<path d={windows(x1 - x0, WALL.height)} fill="var(--color-ink)" />}
					side={
						<BoardText
							board={board}
							accent="var(--color-red)"
							color="var(--color-ink)"
							quiet="var(--color-asphalt)"
							bigSize={126}
						/>
					}
				/>
				<Box
					x0={x0 + 24}
					x1={x1 - 24}
					y0={WALL.y0 + 30}
					y1={WALL.y1 - 30}
					z0={WALL.height}
					z1={WALL.height + 24}
					fill={tone("var(--color-red)")}
				/>
			</g>
		</Thing>
	);
}

function Platform({ x }: { x: number }) {
	const lamp = x - 290;

	return (
		<Thing x0={x - 330} x1={x + 330} y0={40} y1={150}>
			<Box x0={x - 330} x1={x + 330} y0={40} y1={150} z0={0} z1={24} fill={paper} />
			<Box x0={lamp - 4} x1={lamp + 4} y0={126} y1={134} z0={24} z1={150} fill={ground} />
			<Box
				x0={lamp - 12}
				x1={lamp + 12}
				y0={118}
				y1={142}
				z0={150}
				z1={170}
				fill={tone("var(--color-marigold)")}
			/>
		</Thing>
	);
}

const CAR = { length: 300, gap: 14, half: 24, z0: 12, z1: 86 };

/** The train, drawn with its nose at world x = 0: it is the point the view turns about. */
function Train() {
	const body = tone("var(--color-white)");
	const tall = CAR.z1 - CAR.z0;

	return (
		<g className="ride-train" style={{ "--t": 0 } as Vars}>
			{[2, 1, 0].map((car) => {
				const x1 = -car * (CAR.length + CAR.gap);
				const x0 = x1 - CAR.length;

				return (
					<Thing key={car} x0={x0} x1={x1} y0={-CAR.half} y1={CAR.half}>
						<Box x0={x0 + 12} x1={x1 - 12} y0={-18} y1={18} z0={0} z1={CAR.z0} fill={ground} />
						<Box
							x0={x0}
							x1={x1}
							y0={-CAR.half}
							y1={CAR.half}
							z0={CAR.z0}
							z1={CAR.z1}
							fill={body}
							front={
								<>
									<rect x={14} y={14} width={CAR.length - 28} height={24} fill="var(--color-ink)" />
									<rect y={50} width={CAR.length} height={8} fill="var(--color-red)" />
									<rect y={58} width={CAR.length} height={6} fill="var(--color-marigold)" />
									{[70, 210].map((door) => (
										<rect
											key={door}
											x={door}
											y={10}
											width={30}
											height={tall - 14}
											fill={body.left}
											stroke="var(--color-ink)"
											strokeWidth={2}
										/>
									))}
								</>
							}
							side={
								car === 0 && (
									<>
										<rect x={5} y={10} width={38} height={30} fill="var(--color-ink)" />
										<rect y={50} width={48} height={8} fill="var(--color-red)" />
										<rect x={5} y={62} width={10} height={8} fill="var(--color-marigold)" />
										<rect x={33} y={62} width={10} height={8} fill="var(--color-marigold)" />
									</>
								)
							}
							rear={
								car === 2 && (
									<>
										<rect x={5} y={10} width={38} height={30} fill="var(--color-ink)" />
										<rect y={50} width={48} height={8} fill="var(--color-red)" />
										<rect x={5} y={62} width={10} height={8} fill="var(--color-red)" />
										<rect x={33} y={62} width={10} height={8} fill="var(--color-red)" />
									</>
								)
							}
						/>
					</Thing>
				);
			})}
		</g>
	);
}

/**
 * The whole ride as one drawing. Everything behind the track is in the first
 * group and everything in front of it in the second, with the train between
 * them. The stage moves and turns it all by setting three CSS variables on the
 * scene; `vars` is their value at the first stop, so the page is right before
 * any script runs.
 */
export default function RideScene({
	stops,
	vars,
	camera,
}: {
	stops: RideStop[];
	vars: Record<string, string>;
	camera: string;
}) {
	const start = -1700;
	const end = (stops.length - 1) * GAP + 1800;
	const length = end - start;
	const back: { depth: number; node: ReactNode }[] = [];
	const front: { depth: number; node: ReactNode }[] = [];
	const sleepers: string[] = [];

	for (let u = 20; u < length; u += 50) {
		sleepers.push(`M${u} 0h14v60h-14Z`);
	}

	stops.forEach((stop, i) => {
		const x = i * GAP;

		back.push(
			stop.look === "wall"
				? {
						depth: x + WALL.x1 + WALL.y1,
						node: <WallBoard key={`board-${stop.id}`} x={x} board={stop.board} />,
					}
				: {
						depth: x + boardShape[stop.look].half + BOARD_Y,
						node: (
							<StationBoard
								key={`board-${stop.id}`}
								x={x}
								board={stop.board}
								look={stop.look}
								accent={stop.accent}
							/>
						),
					},
		);

		stop.buildings.forEach((building, k) => {
			const slot = Math.floor(k / 2);
			const bx = x - 1040 + slot * 220 + (k % 2) * 110;
			const by = k % 2 === 0 ? -300 : -170;
			back.push({
				depth: bx + by,
				node: (
					<Building key={`${stop.id}-${k}`} kind={building.kind} x={bx} y={by} variant={i + k} />
				),
			});
		});

		front.push({ depth: x + 150, node: <Platform key={`platform-${stop.id}`} x={x} /> });

		if (i < stops.length - 1) {
			front.push({
				depth: x + 750 + 190,
				node: <Signal key={`signal-${stop.id}`} x={x + 750} y={190} />,
			});
		}
	});

	back.sort((a, b) => a.depth - b.depth);
	front.sort((a, b) => a.depth - b.depth);

	return (
		<svg
			viewBox="0 0 1440 900"
			preserveAspectRatio="xMidYMid slice"
			className="absolute inset-0 size-full"
			aria-hidden="true"
		>
			<g className="ride-zoom">
				<g className="ride-camera" transform={camera}>
					<g transform={`translate(${ANCHOR.x} ${ANCHOR.y})`}>
						<g className="ride-scene" style={vars as Vars}>
							<Box x0={start} x1={end} y0={-450} y1={260} z0={-60} z1={0} fill={ground} />
							<Face
								plane="top"
								x={start}
								y={-44}
								z={0}
								width={length}
								height={88}
								fill="color-mix(in srgb, var(--color-asphalt) 86%, white)"
							/>
							<Face plane="top" x={start} y={-30} z={1} width={0} height={0} fill="none">
								<path d={sleepers.join("")} fill="var(--color-ink)" />
							</Face>
							<Face plane="top" x={start} y={-20} z={5} width={length} height={5} fill="var(--color-steel)" />
							<Face plane="top" x={start} y={15} z={5} width={length} height={5} fill="var(--color-steel)" />
							<g className="ride-back">{back.map((item) => item.node)}</g>
							<Train />
							<g className="ride-front">{front.map((item) => item.node)}</g>
						</g>
					</g>
				</g>
			</g>
		</svg>
	);
}
