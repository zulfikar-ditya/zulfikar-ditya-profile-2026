import { resumeUrl } from "./links";

export type Sky = "paper" | "marigold" | "red" | "cobalt" | "green";

/**
 * How a stop presents its text: a tall billboard behind the platform, a wide
 * low board for a paragraph, lettering on the side wall of a building, a
 * coloured sign on one post, a stack of crates with one thing built on each,
 * or a tall board that lists a few things with a heading each.
 */
export type Look = "billboard" | "wide" | "wall" | "sign" | "crates" | "list";

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
export interface BoardItem {
	title: string;
	lines: string[];
}

/**
 * `crates` and `list` stops print `items` instead of `lines`: one line under
 * each title on a crate (about 40 characters), two on a list (about 36).
 */
export interface Board {
	kicker: string;
	big?: string[];
	lines: string[];
	items?: BoardItem[];
	note: string;
	/** A link printed on the board as a button, under the note. */
	button?: { label: string; url: string };
}

const resumeButton = { label: "Open my resume", url: resumeUrl };

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
		camera: { zoom: 1.08, yaw: -8, x: 0, y: 30 },
		board: {
			kicker: "Hi, I'm",
			big: ["Zulfikar", "Ditya"],
			lines: ["I build software, in Jakarta.", "Scroll down and I'll show you."],
			note: "Backend and AI engineer",
			button: resumeButton,
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
				"Lately I also build tools that",
				"sit on top of AI models.",
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
				"My first job: an internship. I",
				"fixed a phone app and built a",
				"website for a school.",
			],
			note: "Java, Android, Laravel, Yii",
		},
		quotes: ["Fixed bugs in an Android app written in Java", "content management system in Laravel"],
		sources: [
			{
				company: "PT Promedia Citra Informatindo",
				title: "Software Engineer Intern",
			},
		],
	},
	{
		id: "first-backend",
		name: "My first backend job",
		years: "2022",
		sky: "red",
		look: "sign",
		camera: { zoom: 0.96, yaw: -88, x: 20, y: 0 },
		board: {
			kicker: "2022 · my first backend job",
			lines: [
				"I built the server side of a",
				"technician booking app, and",
				"flight booking that talks to",
				"two airlines directly.",
			],
			note: "Laravel, Garuda Indonesia and Citilink APIs",
		},
		quotes: ["Garuda Indonesia ticketing API", "Citilink ticketing API"],
		sources: [{ company: "SEJE Digital", title: "Backend Developer" }],
	},
	{
		id: "business-software",
		name: "Business software",
		years: "2022 to 2023",
		sky: "cobalt",
		look: "wall",
		camera: { zoom: 0.96, yaw: 20, x: 0, y: 20 },
		board: {
			kicker: "2022 to 2023",
			big: ["8"],
			lines: [
				"parts of a business",
				"in one app I helped",
				"build: buying, sales,",
				"stock, finance, HR.",
			],
			note: "Laravel ERP for a gas trading company",
		},
		quotes: [
			"purchase request with multi-step approval",
			"Worked on the sales system",
			"finance and HR management modules",
		],
		sources: [{ company: "Intive Studio", title: "Web App Developer" }],
	},
	{
		id: "junction",
		name: "Building for other developers",
		years: "2023 to 2024",
		sky: "paper",
		look: "billboard",
		camera: { zoom: 0.78, yaw: -92, x: 120, y: 30 },
		board: {
			kicker: "2023 to 2024",
			big: ["40%"],
			lines: [
				"faster for the frontend team to",
				"plug into the server I built.",
				"We agreed the rules up front.",
			],
			note: "Endpoint contracts, API docs in Postman",
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
		sky: "marigold",
		look: "crates",
		camera: { zoom: 1.04, yaw: -4, x: 0, y: 0 },
		board: {
			kicker: "2024 to now · my main job",
			lines: [],
			items: [
				{
					title: "Promotions",
					lines: ["Shoppers in Asia Pacific claim rewards."],
				},
				{
					title: "Loyalty points",
					lines: ["Send a receipt on WhatsApp, get points."],
				},
				{
					title: "Tools for staff",
					lines: ["Tasks, finance, hiring, security checks."],
				},
			],
			note: "Laravel, NestJS, PostgreSQL, Redis, queues",
		},
		quotes: [
			"promotion site used across Asia Pacific markets",
			"receipt parsing engine powering a customer loyalty product",
			"internal project and task manager",
			"sales, finance, and HR back office",
			"candidate processing pipeline",
			"internal security scanning tool",
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
		name: "Whole apps, with AI inside",
		years: "2026",
		sky: "green",
		look: "list",
		camera: { zoom: 0.88, yaw: -84, x: 40, y: 10 },
		board: {
			kicker: "2026 · whole apps, with AI inside",
			lines: [],
			items: [
				{
					title: "Public documents",
					lines: [
						"Ask about a government rule, get",
						"the answer and where it came from.",
					],
				},
				{
					title: "Business numbers",
					lines: ["Ask how the business is doing", "and get a chart back."],
				},
				{
					title: "Buying from suppliers",
					lines: [
						"It writes the request to suppliers",
						"and compares their prices for you.",
					],
				},
			],
			note: "Backend, frontend, AI: NestJS, Next.js, RAG",
		},
		quotes: [
			"question answering platform for public-sector documents",
			"generative dashboard platform",
			"AI assistance into a procurement platform",
			"the backend, the Next.js frontend, and the AI layer",
		],
		sources: [
			{
				company: "SUPERFUTUREKOMPANY",
				title: "Backend Engineer & AI Engineer Assistant",
				group: "AI Engineering",
			},
		],
	},
];

/** Where the ride ends: the train leaves from here and the page takes over. */
export const outroStops: Stop[] = [
	{
		id: "goodbye",
		name: "End of the ride",
		sky: "paper",
		look: "billboard",
		camera: { zoom: 1.04, yaw: -6, x: 0, y: 30 },
		board: {
			kicker: "That's the ride so far",
			big: ["Thanks for", "riding along"],
			lines: ["The details are just below, or", "you can take my resume with you."],
			note: "Work history, tools, open source, writing",
			button: resumeButton,
		},
	},
];
