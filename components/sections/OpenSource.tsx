import projectsData from "@/public/mock/projects.json";
import Count from "./Count";
import Heading from "./Heading";

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

const projects: ProjectGroup[] = projectsData;

export default function OpenSource() {
	const repoCount = projects.reduce((sum, group) => sum + group.repos.length, 0);

	return (
		<section id="open-source" aria-label="Open source" className="bg-marigold py-24 md:py-36">
			<div className="container mx-auto px-4 sm:px-8 lg:px-16">
				<Heading text="Things I've built and given away" effect="flip" />
				<p className="text-xl md:text-2xl mt-6 max-w-2xl leading-relaxed">
					<Count to={repoCount} /> projects that are free for any developer to use, copy and
					improve. I made them to save other people the setup work I kept
					repeating.
				</p>

				<div className="grid lg:grid-cols-2 gap-x-16 gap-y-20 mt-16">
					{projects.map((group) => (
						<div key={group.category}>
							<h3 className="text-3xl font-extrabold">
								<a
									href={group.orgUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="underline decoration-2 underline-offset-4 hover:decoration-4"
								>
									{group.category}
								</a>
							</h3>
							<p className="text-lg mt-2 max-w-md leading-relaxed">{group.description}</p>

							<ul className="mt-8 border-t-2 border-ink">
								{group.repos.map((repo) => (
									<li key={repo.name} className="border-b-2 border-ink">
										<a
											href={repo.url}
											target="_blank"
											rel="noopener noreferrer"
											className="block py-4 hover:bg-white/40 transition-colors"
										>
											<span className="block text-2xl font-extrabold">{repo.name}</span>
											<span className="block mt-1">{repo.description}</span>
											<span className="block text-sm font-semibold mt-1">
												{repo.tags.join(", ")}
											</span>
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
