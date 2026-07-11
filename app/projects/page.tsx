import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export default function ProjectsPage() {
	return (
		<div className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader eyebrow="Open source" title="Things I've built and shared"
				intro="Boilerplates and tools I maintain for cleaner, faster backend work." />
			<div className="space-y-12">
				{projects.map((group) => (
					<div key={group.category}>
						<a href={group.orgUrl} target="_blank" rel="noopener noreferrer" className="font-display text-2xl font-bold hover:text-accent">{group.category}</a>
						<p className="mt-1 text-sm text-muted-fg">{group.description}</p>
						<Stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{group.repos.map((r) => <StaggerItem key={r.name}><ProjectCard repo={r} /></StaggerItem>)}
						</Stagger>
					</div>
				))}
			</div>
		</div>
	);
}
