import experienceData from "@/public/mock/experience.json";

interface ExperienceGroup {
	label: string;
	descriptions: string[];
}

interface Experience {
	title: string;
	type: string;
	company: string;
	date_start: string;
	date_end: string;
	skills: string[];
	/** Short context line shown above the bullets (e.g. a promotion note). */
	note?: string;
	/** Flat bullet list — used when the role has no sub-tracks. */
	descriptions?: string[];
	/** Labelled bullet groups — used when one role spans multiple tracks. */
	groups?: ExperienceGroup[];
}

function BulletList({ descriptions }: { descriptions: string[] }) {
	return (
		<ul className="space-y-2">
			{descriptions.map((desc, descIndex) => (
				<li
					key={descIndex}
					className="text-p-muted text-sm flex items-start gap-2.5"
				>
					<span className="text-p-accent font-jetbrains mt-0.5 select-none shrink-0">
						›
					</span>
					<span className="leading-relaxed">{desc}</span>
				</li>
			))}
		</ul>
	);
}

export default function WorkExperienceSection() {
	const experiences: Experience[] = experienceData;

	return (
		<section
			id="work-experience"
			aria-label="Work Experience"
			className="bg-p-base"
		>
			<div className="container mx-auto px-8 lg:px-16 py-24 max-w-6xl">
				{/* Section label */}
				<p className="font-jetbrains text-xs tracking-[0.25em] text-p-accent uppercase mb-4">
					// 002
				</p>

				{/* Heading */}
				<h2 className="font-display text-5xl md:text-7xl font-bold text-p-ink mb-10 leading-tight">
					<span className="text-p-accent">[</span>
					Work Experience
					<span className="text-p-accent">]</span>
				</h2>

				{/* Divider */}
				<div className="w-full h-px bg-p-border mb-16" />

				<div className="max-w-4xl">
					{experiences.map((exp, index) => (
						<div key={index} className="relative pl-10 pb-10 last:pb-0">
							{/* Vertical timeline line */}
							{index !== experiences.length - 1 && (
								<div className="absolute left-[7px] top-5 bottom-0 w-px bg-p-border" />
							)}

							{/* Square accent dot */}
							<div className="absolute left-0 top-2 w-3.5 h-3.5 bg-p-accent" />

							{/* Content card */}
							<div className="bg-p-card border border-p-border hover:border-p-border-bright transition-all duration-300 p-6">
								{/* Header row */}
								<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
									<div>
										<h3 className="font-display text-xl md:text-2xl font-bold text-p-ink mb-1">
											{exp.title}
										</h3>
										<p className="text-p-muted text-sm mb-2">{exp.company}</p>
										<span className="inline-block px-2.5 py-0.5 text-xs font-jetbrains border border-p-border text-p-muted tracking-wide">
											{exp.type}
										</span>
									</div>
									<div className="font-jetbrains text-xs text-p-muted tracking-wide md:text-right shrink-0">
										{exp.date_start} → {exp.date_end}
									</div>
								</div>

								{/* Context note */}
								{exp.note && (
									<p className="text-p-ink text-sm leading-relaxed border-l-2 border-p-accent pl-3 mb-5">
										{exp.note}
									</p>
								)}

								{/* Descriptions */}
								<div className="mb-5">
									{exp.groups ? (
										<div className="space-y-5">
											{exp.groups.map((group) => (
												<div key={group.label}>
													<div className="flex items-center gap-3 mb-3">
														<p className="font-jetbrains text-xs tracking-[0.2em] text-p-accent uppercase shrink-0">
															{group.label}
														</p>
														<div className="flex-1 h-px bg-p-border" />
													</div>
													<BulletList descriptions={group.descriptions} />
												</div>
											))}
										</div>
									) : (
										<BulletList descriptions={exp.descriptions ?? []} />
									)}
								</div>

								{/* Skills */}
								<div className="flex flex-wrap gap-2">
									{exp.skills.map((skill, skillIndex) => (
										<span
											key={skillIndex}
											className="px-2.5 py-1 text-xs font-jetbrains border border-p-border text-p-muted tracking-wide hover:border-p-border-bright transition-colors"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
