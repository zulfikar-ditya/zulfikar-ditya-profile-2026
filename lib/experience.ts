import experienceData from "@/public/mock/experience.json";
import type { Station, StationSource } from "@/content/stations";

export interface ExperienceGroup {
	label: string;
	descriptions: string[];
}

export interface Experience {
	title: string;
	type: string;
	company: string;
	date_start: string;
	date_end: string;
	skills: string[];
	/** One or two sentences a non-technical reader understands. */
	summary?: string;
	note?: string;
	descriptions?: string[];
	groups?: ExperienceGroup[];
}

export interface StationEntry {
	title: string;
	type: string;
	company: string;
	date_start: string;
	date_end: string;
	skills: string[];
	descriptions: string[];
}

export const experiences: Experience[] = experienceData;

function resolveSource(source: StationSource): StationEntry {
	const entry = experiences.find(
		(e) => e.company === source.company && e.title === source.title,
	);
	if (!entry) {
		throw new Error(
			`No experience entry for "${source.title}" at "${source.company}"`,
		);
	}

	let descriptions = entry.descriptions ?? [];
	if (source.group) {
		const group = entry.groups?.find((g) => g.label === source.group);
		if (!group) {
			throw new Error(
				`No group "${source.group}" in "${source.title}" at "${source.company}"`,
			);
		}
		descriptions = group.descriptions;
	}

	return {
		title: source.group ? `${entry.title} · ${source.group}` : entry.title,
		type: entry.type,
		company: entry.company,
		date_start: entry.date_start,
		date_end: entry.date_end,
		skills: entry.skills,
		descriptions,
	};
}

/**
 * Resolve a station's job entries, and fail the build if the board quotes
 * wording that is no longer in experience.json.
 */
export function getStationEntries(station: Station): StationEntry[] {
	const entries = station.sources.map(resolveSource);
	const text = entries.flatMap((e) => e.descriptions).join("\n");

	for (const quote of station.quotes) {
		if (!text.includes(quote)) {
			throw new Error(
				`Station "${station.id}": quote not found in experience data: "${quote}"`,
			);
		}
	}

	return entries;
}

export function getYearsOfExperience(now: Date = new Date()): number {
	const starts = experiences.map((e) => new Date(`1 ${e.date_start}`).getTime());
	const months = (now.getTime() - Math.min(...starts)) / (1000 * 60 * 60 * 24 * 30.44);
	return Math.floor(months / 12);
}
