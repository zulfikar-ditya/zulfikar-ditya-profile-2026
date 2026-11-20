"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GAP, STOP_OFFSET, cameraBetween, sceneVars, type StageStop } from "./config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Standing {
	el: SVGGElement;
	box: number[];
	depth: number;
}

/**
 * The pinned ride. Scroll position is the only clock: it moves the world under
 * the train, turns and zooms the view from stop to stop, raises each building
 * as the train nears it, and changes the sky between stations. With reduced
 * motion the ride cuts from stop to stop instead.
 */
export default function RideStage({
	stops,
	children,
}: {
	stops: StageStop[];
	children: ReactNode;
}) {
	const root = useRef<HTMLElement>(null);
	const last = stops.length - 1;

	useGSAP(
		() => {
			const el = root.current;
			if (!el) return;

			const stage = el.querySelector<HTMLElement>(".ride-stage");
			const nextSky = el.querySelector<HTMLElement>(".ride-next-sky");
			const scene = el.querySelector<SVGGElement>(".ride-scene");
			const camera = el.querySelector<SVGGElement>(".ride-camera");
			const segments = el.querySelectorAll<HTMLElement>(".ride-segment");
			const hint = el.querySelector<HTMLElement>(".ride-hint");
			const counts = gsap.utils.toArray<SVGTextElement>(".ride-count", el);
			const rises = gsap.utils.toArray<SVGGElement>(".ride-rise", el);
			const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			const layers = [".ride-back", ".ride-train", ".ride-front"].map((selector) => {
				const parent = el.querySelector<SVGGElement>(selector);
				const things: Standing[] = Array.from(
					parent?.querySelectorAll<SVGGElement>(":scope > .ride-thing") ?? [],
				).map((thing) => ({
					el: thing,
					box: (thing.dataset.box ?? "").split(" ").map(Number),
					depth: 0,
				}));
				return { parent, things };
			});

			/** Turning the view changes what overlaps what, so redraw order follows the angle. */
			const reorder = (yaw: number) => {
				const angle = (yaw * Math.PI) / 180;
				const alongX = Math.cos(angle) + Math.sin(angle);
				const alongY = Math.cos(angle) - Math.sin(angle);

				for (const { parent, things } of layers) {
					let sorted = true;
					things.forEach((thing, i) => {
						const [x0, x1, y0, y1] = thing.box;
						thing.depth = (alongX > 0 ? x1 : x0) * alongX + (alongY > 0 ? y1 : y0) * alongY;
						if (i > 0 && thing.depth < things[i - 1].depth) sorted = false;
					});
					if (sorted || !parent) continue;
					things.sort((a, b) => a.depth - b.depth);
					things.forEach((thing) => parent.appendChild(thing.el));
				}
			};

			const render = (raw: number) => {
				const p = reduced ? Math.round(raw * last) / last : raw;
				const trainX = STOP_OFFSET + p * last * GAP;
				const at = p * last;
				const from = Math.min(last - 1, Math.floor(at));
				const t = at - from;
				const portrait = window.innerWidth / window.innerHeight < 0.8;
				const view = cameraBetween(stops[from], stops[from + 1], t, from, portrait);

				if (scene) {
					scene.dataset.view = view.yaw < -45 ? "rear" : "front";
					for (const [name, value] of Object.entries(sceneVars(view.yaw, trainX))) {
						scene.style.setProperty(name, value);
					}
				}
				camera?.setAttribute("transform", view.transform);
				reorder(view.yaw);

				const wipe = gsap.utils.clamp(0, 1, (t - 0.2) / 0.6);
				const edge = 100 - wipe * 140;
				if (stage && nextSky) {
					stage.style.backgroundColor = stops[from].sky;
					nextSky.style.backgroundColor = stops[from + 1].sky;
					nextSky.style.clipPath = `polygon(${edge + 40}% 0, 100% 0, 100% 100%, ${edge}% 100%)`;
				}

				counts.forEach((count) => {
					const stopX = Number(count.closest<SVGGElement>("[data-x]")?.dataset.x);
					const arrived = gsap.utils.clamp(0, 1, (trainX - stopX + 420) / 500);
					const eased = reduced ? 1 : 1 - (1 - arrived) ** 3;
					const target = Number(count.dataset.value);
					const decimals = (count.dataset.value ?? "").split(".")[1]?.length ?? 0;
					count.textContent = `${(target * eased).toFixed(decimals)}${count.dataset.suffix ?? ""}`;
				});
				rises.forEach((building) => {
					const grown = gsap.utils.clamp(
						0,
						1,
						(trainX + 780 - Number(building.dataset.x)) / 360,
					);
					building.style.transform = `scaleY(${reduced ? Math.round(grown) : grown})`;
				});
				segments.forEach((segment, i) => {
					segment.style.opacity = i <= Math.round(at) ? "1" : "0.3";
				});
				if (hint) hint.style.opacity = p < 0.03 ? "1" : "0";
			};

			const progress = { value: 0 };
			gsap.to(progress, {
				value: 1,
				ease: "none",
				onUpdate: () => render(progress.value),
				scrollTrigger: {
					trigger: el,
					start: "top top",
					end: "bottom bottom",
					scrub: reduced ? true : 0.5,
				},
			});
			render(0);
		},
		{ scope: root },
	);

	return (
		<section
			id="ride"
			ref={root}
			aria-label="My career, year by year"
			className="relative"
			style={{ height: `${stops.length * 100}svh` }}
		>
			{stops.map((stop, i) => (
				<div
					key={stop.id}
					id={stop.id}
					className="absolute inset-x-0 h-svh snap-start pointer-events-none"
					style={{ top: `${i * 100}svh` }}
				/>
			))}

			<div
				className="ride-stage sticky top-0 h-svh overflow-hidden"
				style={{ backgroundColor: stops[0].sky }}
			>
				<div
					aria-hidden="true"
					className="ride-next-sky absolute inset-0"
					style={{ clipPath: "polygon(0 0, 0 0, 0 0)" }}
				/>
				{children}

				<nav aria-label="Stops" className="absolute top-0 inset-x-0 bg-ink px-3 sm:px-6">
					<ol className="flex gap-1.5">
						{stops.map((stop) => (
							<li key={stop.id} className="flex-1">
								<a
									href={`#${stop.id}`}
									aria-label={stop.label}
									className="group block py-3 text-paper"
								>
									<span className="ride-segment block h-1.5 bg-paper group-hover:bg-marigold transition-colors" />
								</a>
							</li>
						))}
					</ol>
				</nav>

				<div className="absolute top-9 inset-x-0 px-3 sm:px-6 flex items-start justify-between gap-4 font-bold">
					<p className="ride-hint bg-ink text-paper px-4 py-3 transition-opacity duration-300">
						Scroll down to follow my career
					</p>
					<a
						href="#about"
						className="ml-auto bg-ink text-paper px-4 py-3 underline underline-offset-4 hover:bg-paper hover:text-ink active:translate-y-px transition-colors"
					>
						Skip the ride
					</a>
				</div>
			</div>
		</section>
	);
}
