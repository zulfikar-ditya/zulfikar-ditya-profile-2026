import { experiences, getYearsOfExperience, type Experience } from "@/lib/experience";
import Count from "./Count";
import Heading from "./Heading";

function dates(entry: Experience): string {
	return entry.date_start === entry.date_end
		? entry.date_start
		: `${entry.date_start} to ${entry.date_end}`;
}

function Bullets({ items }: { items: string[] }) {
	return (
		<ul className="list-disc pl-5 space-y-2 leading-relaxed marker:text-red">
			{items.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>
	);
}

function Details({ entry }: { entry: Experience }) {
	return (
		<div className="mt-4 space-y-6">
			{entry.note && <p className="font-semibold">{entry.note}</p>}
			{entry.groups?.map((group) => (
				<div key={group.label}>
					<h4 className="font-bold text-lg mb-3">{group.label}</h4>
					<Bullets items={group.descriptions} />
				</div>
			))}
			{entry.descriptions && <Bullets items={entry.descriptions} />}
			<p className="text-sm font-semibold">Tools used: {entry.skills.join(", ")}</p>
		</div>
	);
}

export default function Work() {
	return (
		<section id="work" aria-label="Work history" className="bg-white py-24 md:py-36">
			<div className="container mx-auto px-4 sm:px-8 lg:px-16">
				<Heading text="Work history" effect="board" />
				<p className="text-xl md:text-2xl mt-6 max-w-2xl">
					<Count to={experiences.length} /> jobs in{" "}
					<Count to={getYearsOfExperience()} /> years, newest
					first. Each one starts with the short version. The technical details
					are one click away.
				</p>

				<ol className="mt-14 border-t-2 border-ink">
					{experiences.map((entry) => (
						<li
							key={`${entry.company}-${entry.title}`}
							className="grid md:grid-cols-[15rem_1fr] gap-x-8 gap-y-2 py-8 border-b-2 border-ink"
						>
							<p className="font-semibold tabular-nums">{dates(entry)}</p>
							<div className="max-w-3xl">
								<h3 className="text-2xl md:text-3xl font-extrabold">{entry.title}</h3>
								<p className="mt-1 font-semibold">
									{entry.company} · {entry.type}
								</p>
								{entry.summary && (
									<p className="mt-4 text-lg md:text-xl leading-relaxed">
										{entry.summary}
									</p>
								)}

								<details className="group mt-5">
									<summary className="inline-flex items-center gap-2 py-2 font-bold underline decoration-2 underline-offset-4 hover:decoration-4 list-none [&::-webkit-details-marker]:hidden">
										<span className="group-open:hidden">Show the technical details</span>
										<span className="hidden group-open:inline">Hide the technical details</span>
									</summary>
									<Details entry={entry} />
								</details>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
