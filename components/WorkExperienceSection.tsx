import experienceData from "@/public/mock/experience.json";

interface Experience {
	title: string;
	type: string;
	company: string;
	date_start: string;
	date_end: string;
	skills: string[];
	descriptions: string[];
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

								{/* Descriptions */}
								<ul className="space-y-2 mb-5">
									{exp.descriptions.map((desc, descIndex) => (
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
