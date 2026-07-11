import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function ProjectsPreview() {
	const repos = projects.flatMap((group) => group.repos).slice(0, 4);

	return (
		<section className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader
				eyebrow="Open Source"
				title="Selected projects"
				intro="Starter kits and tools I maintain in the open."
			/>

			<Stagger className="grid gap-4 sm:grid-cols-2">
				{repos.map((repo) => (
					<StaggerItem key={repo.url}>
						<ProjectCard repo={repo} />
					</StaggerItem>
				))}
			</Stagger>

			<div className="mt-8">
				<Button href="/projects" variant="secondary">All projects</Button>
			</div>
		</section>
	);
}
