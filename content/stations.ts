export type Sky = "paper" | "marigold" | "red" | "cobalt" | "green";

/**
 * How a stop presents its text: a tall billboard behind the platform, a wide
 * low board for a paragraph, or lettering on the side wall of a building.
 */
export type Look = "billboard" | "wide" | "wall";

/**
 * Where the camera settles at a stop. `yaw` turns the view in degrees. Near 0
 * the stop's text sits to the right of the train; near -90 the view has swung
 * round and the text sits to its left. Stay between -100 and 30. `x` and `y` nudge the framing after the stop's
 * text has been centred.
 */
export interface Camera {
	zoom: number;
	yaw: number;
	x: number;
	y: number;
}

/**
 * What is printed at a stop. `lines` say it in words anyone understands;
 * `note` is one short line of specifics for readers who know the field.
 * Lines are wrapped by hand: about 30 characters on a billboard or wide board,
 * about 21 on a wall.
 */
export interface Board {
	kicker: string;
	big?: string[];
	lines: string[];
	note: string;
}

export interface Stop {
	id: string;
	name: string;
	sky: Sky;
	look: Look;
	camera: Camera;
	board: Board;
}

/** Points at one entry in `public/mock/experience.json`, optionally at one of its groups. */
export interface StationSource {
	company: string;
	title: string;
	group?: string;
}

export interface Station extends Stop {
	years: string;
	/** Wording in experience.json that the board's numbers come from. */
	quotes: string[];
	sources: StationSource[];
}

export const introStops: Stop[] = [
	{
		id: "hello",
		name: "Hello",
		sky: "paper",
		look: "billboard",
		camera: { zoom: 1.14, yaw: -8, x: 0, y: 0 },
		board: {
			kicker: "Hi, I'm",
			big: ["Zulfikar", "Ditya"],
			lines: ["I build software, in Jakarta.", "Scroll down and I'll show you."],
			note: "Backend and AI engineer",
		},
	},
	{
		id: "who",
		name: "What I do",
		sky: "cobalt",
		look: "wide",
		camera: { zoom: 0.84, yaw: -84, x: 30, y: 10 },
		board: {
			kicker: "What I do",
			lines: [
				"I build the part of an app you",
				"never see: the part that checks",
				"who you are and finds your data.",
				"Lately I also build AI that",
				"answers people's questions.",
			],
			note: "Laravel, NestJS, FastAPI, Go, PostgreSQL, RAG",
		},
	},
];

export const stations: Station[] = [
	{
		id: "origin",
		name: "Where it started",
		years: "2021",
		sky: "marigold",
		look: "billboard",
		camera: { zoom: 1, yaw: -6, x: 0, y: 0 },
		board: {
			kicker: "2021 · where it started",
			big: ["2021"],
			lines: [
				"My first job in tech: an",
				"internship. I fixed bugs and",
				"built my first phone app.",
			],
			note: "Laravel, Yii, REST APIs, Android in Java",
		},
		quotes: ["Built Android applications in Java", "Identified and resolved bugs"],
		sources: [
			{
				company: "PT Promedia Citra Informatindo",
				title: "Software Engineer Intern",
			},
		],
	},
	{
		id: "backend-line",
		name: "First real jobs",
		years: "2022 to 2023",
		sky: "red",
		look: "wall",
		camera: { zoom: 0.96, yaw: 20, x: 0, y: 20 },
		board: {
			kicker: "2022 to 2023",
			big: ["75%"],
			lines: [
				"fewer problems",
				"reaching customers,",
				"because I tested the",
				"software before",
				"release.",
			],
			note: "QA and test coverage",
		},
		quotes: ["reducing production issues by 75%"],
		sources: [
			{ company: "SEJE Digital", title: "Backend Developer" },
			{ company: "Intive Studio", title: "Web App Developer" },
		],
	},
	{
		id: "junction",
		name: "Juggling five jobs",
		years: "2023 to 2024",
		sky: "cobalt",
		look: "billboard",
		camera: { zoom: 0.64, yaw: -92, x: 250, y: 60 },
		board: {
			kicker: "2023 to 2024 · juggling five jobs",
			big: ["40%"],
			lines: [
				"faster for other developers to",
				"connect their apps to mine. We",
				"agreed the rules up front.",
			],
			note: "Endpoint contracts and API documentation",
		},
		quotes: ["reducing integration time by 40%"],
		sources: [
			{
				company: "PT Anomali Trans Teknologi",
				title: "Application Developer Officer",
			},
			{ company: "PT SEJE Digital Utama", title: "Backend Developer" },
			{ company: "Intive Studio", title: "Laravel Developer" },
			{ company: "Self Employed", title: "Web Developer" },
			{ company: "PT Anomali Trans Teknologi", title: "Mendix Developer" },
		],
	},
	{
		id: "main-terminal",
		name: "My main job",
		years: "2024 to now",
		sky: "paper",
		look: "billboard",
		camera: { zoom: 1.18, yaw: -4, x: 0, y: 0 },
		board: {
			kicker: "2024 to now · my main job",
			big: ["99.9%"],
			lines: [
				"of the time, the apps I look",
				"after are up and running. They",
				"also fetch data 30% faster.",
			],
			note: "Monitoring, schema design, indexing, Redis",
		},
		quotes: [
			"maintaining 99.9% application uptime",
			"resulting in 30% faster query execution",
		],
		sources: [
			{
				company: "SUPERFUTUREKOMPANY",
				title: "Backend Engineer & AI Engineer Assistant",
				group: "Backend Engineering",
			},
			{
				company: "Self Employed",
				title: "Information Technology Team Lead",
			},
		],
	},
	{
		id: "ai-line",
		name: "Now building AI too",
		years: "2026",
		sky: "green",
		look: "billboard",
		camera: { zoom: 0.9, yaw: -84, x: 60, y: 10 },
		board: {
			kicker: "2026 · now building AI too",
			big: ["3"],
			lines: [
				"AI providers wired into one",
				"system. If one goes down, the",
				"next one answers instead.",
			],
			note: "OpenAI, Anthropic, OpenRouter fallback",
		},
		quotes: ["Integrated OpenAI, Anthropic, and OpenRouter models", "provider fallback routing"],
		sources: [
			{
				company: "SUPERFUTUREKOMPANY",
				title: "Backend Engineer & AI Engineer Assistant",
				group: "AI Engineering",
			},
		],
	},
];
