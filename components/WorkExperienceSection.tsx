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
			className="py-20 bg-black"
		>
			<div className="container mx-auto px-4">
				<h2 className="text-5xl font-bold text-center mb-16 text-white">
					Work Experience
				</h2>

				<div className="max-w-5xl mx-auto">
					{experiences.map((exp, index) => (
						<div key={index} className="relative pl-8 pb-12 last:pb-0">
							{/* Timeline line */}
							{index !== experiences.length - 1 && (
								<div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-linear-to-b from-[#00bba7] to-[#e12afb]" />
							)}

							{/* Timeline dot */}
							<div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-linear-to-br from-[#00bba7] to-[#e12afb] flex items-center justify-center">
								<div className="w-3 h-3 rounded-full bg-black" />
							</div>

							{/* Content card */}
							<div className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800 transition-colors border border-zinc-800">
								<div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
									<div>
										<h3 className="text-2xl font-bold text-white mb-1">
											{exp.title}
										</h3>
										<p className="text-lg text-gray-300 mb-2">{exp.company}</p>
										<span className="inline-block px-3 py-1 text-sm bg-zinc-800 text-gray-300 rounded-full">
											{exp.type}
										</span>
									</div>
									<div className="text-gray-400 mt-2 md:mt-0 text-sm md:text-right">
										{exp.date_start} - {exp.date_end}
									</div>
								</div>

								<ul className="space-y-2 mb-4">
									{exp.descriptions.map((desc, descIndex) => (
										<li
											key={descIndex}
											className="text-gray-400 text-sm flex items-start"
										>
											<span className="text-[#00bba7] mr-2">▹</span>
											<span>{desc}</span>
										</li>
									))}
								</ul>

								<div className="flex flex-wrap gap-2">
									{exp.skills.map((skill, skillIndex) => (
										<span
											key={skillIndex}
											className="px-3 py-1 text-xs bg-black text-gray-300 rounded-md border border-zinc-700"
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
