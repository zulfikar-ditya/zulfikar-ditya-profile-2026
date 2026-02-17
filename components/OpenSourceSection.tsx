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
			className="py-20 bg-gray-950"
		>
			<div className="container mx-auto px-4">
				<h2 className="text-5xl font-bold text-center mb-4 text-white">
					Open Source
				</h2>
				<p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
					Projects I&apos;ve built and maintain for the community
				</p>

				<div className="max-w-5xl mx-auto space-y-12">
					{projects.map((group) => (
						<div key={group.category}>
							<div className="flex items-center gap-3 mb-6">
								<h3 className="text-2xl font-bold text-[#00bba7]">
									{group.category}
								</h3>
								<span className="text-gray-500">—</span>
								<p className="text-gray-400">{group.description}</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{group.repos.map((repo) => (
									<a
										key={repo.name}
										href={repo.url}
										target="_blank"
										rel="noopener noreferrer"
										className="group bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-600 transition-all hover:bg-zinc-800"
									>
										<div className="flex items-center gap-2 mb-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="text-gray-500"
											>
												<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
												<path d="M9 18c-4.51 2-5-2-7-2" />
											</svg>
											<h4 className="text-white font-semibold group-hover:text-[#00bba7] transition-colors">
												{repo.name}
											</h4>
										</div>

										<p className="text-gray-400 text-sm mb-4">
											{repo.description}
										</p>

										<div className="flex flex-wrap gap-2">
											{repo.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 text-xs bg-black text-gray-300 rounded-md border border-zinc-700"
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

				<div className="text-center mt-12">
					<a
						href="https://github.com/zulfikar-ditya"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-full border border-zinc-700 hover:border-[#00bba7] hover:text-[#00bba7] transition-colors"
					>
						View all repositories on GitHub
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
						>
							<path d="M7 7h10v10" />
							<path d="M7 17L17 7" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
