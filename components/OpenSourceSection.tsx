import projectsData from "@/public/mock/projects.json";

interface Repo {
	name: string;
	description: string;
	url: string;
	tags: string[];
}

interface ProjectGroup {
	category: string;
	description: string;
	orgUrl: string;
	repos: Repo[];
}

export default function OpenSourceSection() {
	const projects: ProjectGroup[] = projectsData;

	return (
		<section
			id="open-source"
			aria-label="Open Source Projects"
			className="bg-p-surface"
		>
			<div className="container mx-auto px-8 lg:px-16 py-24 max-w-6xl">
				{/* Section label */}
				<p className="font-jetbrains text-xs tracking-[0.25em] text-p-accent uppercase mb-4">
					// 003
				</p>

				{/* Heading */}
				<h2 className="font-display text-5xl md:text-7xl font-bold text-p-ink mb-10 leading-tight">
					<span className="text-p-accent">[</span>
					Open Source_
					<span className="text-p-accent">]</span>
				</h2>

				{/* Divider */}
				<div className="w-full h-px bg-p-border mb-16" />

				<div className="max-w-4xl space-y-14">
					{projects.map((group) => (
						<div key={group.category}>
							{/* Category header */}
							<div className="flex items-baseline gap-4 mb-6">
								<h3 className="font-display text-xl font-bold text-p-accent">
									{group.category}
								</h3>
								<div className="flex-1 h-px bg-p-border" />
								<p className="font-jetbrains text-xs text-p-muted tracking-wide shrink-0">
									{group.description}
								</p>
							</div>

							{/* Repos grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								{group.repos.map((repo) => (
									<a
										key={repo.name}
										href={repo.url}
										target="_blank"
										rel="noopener noreferrer"
										className="group bg-p-card border border-p-border hover:border-p-border-bright transition-all duration-300 p-6 block"
									>
										{/* Repo header */}
										<div className="flex items-center gap-2.5 mb-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="text-p-dim group-hover:text-p-accent transition-colors duration-300 shrink-0"
											>
												<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
												<path d="M9 18c-4.51 2-5-2-7-2" />
											</svg>
											<h4 className="font-jetbrains text-sm font-medium text-p-ink group-hover:text-p-accent transition-colors duration-300 tracking-wide">
												{repo.name}
											</h4>
										</div>

										<p className="text-p-muted text-sm leading-relaxed mb-5">
											{repo.description}
										</p>

										<div className="flex flex-wrap gap-2">
											{repo.tags.map((tag) => (
												<span
													key={tag}
													className="px-2.5 py-1 text-xs font-jetbrains border border-p-border text-p-muted tracking-wide"
												>
													{tag}
												</span>
											))}
										</div>
									</a>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
