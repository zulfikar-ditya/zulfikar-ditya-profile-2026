import RideScene, { type RideStop } from "@/components/ride/RideScene";
import RideStage from "@/components/ride/RideStage";
import {
	STOP_OFFSET,
	cameraBetween,
	focusOf,
	sceneVars,
	skyColor,
	type StageStop,
} from "@/components/ride/config";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import OpenSource from "@/components/sections/OpenSource";
import Ribbon from "@/components/sections/Ribbon";
import Tools from "@/components/sections/Tools";
import Work from "@/components/sections/Work";
import Writing from "@/components/sections/Writing";
import { introStops, stations, type Stop } from "@/content/stations";
import { getStationEntries, type StationEntry } from "@/lib/experience";

function buildingKind(
	entry: StationEntry,
	index: number,
	isAi: boolean,
): RideStop["buildings"][number]["kind"] {
	if (isAi) return "lab";
	if (entry.type.startsWith("Internship")) return "school";
	if (entry.type.startsWith("Freelance")) return "shop";
	return index % 2 === 0 ? "tower" : "office";
}

const allStops: Stop[] = [...introStops, ...stations];

const rideStops: RideStop[] = [
	...introStops.map((stop) => ({
		id: `stop-${stop.id}`,
		look: stop.look,
		accent: "var(--color-marigold)",
		board: stop.board,
		buildings: [],
	})),
	...stations.map((station) => ({
		id: `stop-${station.id}`,
		look: station.look,
		accent: station.sky === "green" ? "var(--color-green)" : "var(--color-marigold)",
		board: station.board,
		buildings: getStationEntries(station).map((entry, i) => ({
			kind: buildingKind(entry, i, station.sky === "green"),
		})),
	})),
];

const stageStops: StageStop[] = allStops.map((stop) => ({
	id: `stop-${stop.id}`,
	label: stop.name,
	sky: skyColor[stop.sky],
	camera: stop.camera,
	focus: focusOf[stop.look],
}));

const firstView = cameraBetween(stageStops[0], stageStops[1], 0, 0, false);

export default function Home() {
	return (
		<>
			<main>
				<div className="sr-only">
					<h1>
						Zulfikar Ditya. I build the part of apps you never see, and AI that
						answers questions.
					</h1>
					{allStops.map((stop) => (
						<section key={stop.id}>
							<h2>{stop.name}</h2>
							<p>
								{stop.board.big?.join(" ")} {stop.board.lines.join(" ")} (
								{stop.board.note})
							</p>
						</section>
					))}
				</div>

				<RideStage stops={stageStops}>
					<RideScene
						stops={rideStops}
						vars={sceneVars(firstView.yaw, STOP_OFFSET)}
						camera={firstView.transform}
					/>
				</RideStage>

				<Ribbon text="Backend and AI engineer" />
				<About />
				<Work />
				<Tools />
				<OpenSource />
				<Writing />
			</main>
			<Contact />
		</>
	);
}
