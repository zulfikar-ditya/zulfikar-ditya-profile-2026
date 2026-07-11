import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

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
						<Card className="flex h-full flex-col">
							<a
								href={repo.url}
								target="_blank"
								rel="noopener noreferrer"
								className="font-display text-lg font-semibold hover:text-accent"
							>
								{repo.name}
							</a>
							<p className="mt-2 text-sm text-muted-fg">{repo.description}</p>
							<div className="mt-4 flex flex-wrap gap-2">
								{repo.tags.map((tag) => (
									<Badge key={tag}>{tag}</Badge>
								))}
							</div>
						</Card>
					</StaggerItem>
				))}
			</Stagger>

			<div className="mt-8">
				<Button href="/projects" variant="secondary">All projects</Button>
			</div>
		</section>
	);
}
