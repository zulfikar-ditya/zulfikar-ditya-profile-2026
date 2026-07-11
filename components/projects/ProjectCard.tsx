import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Repo } from "@/data/projects";

export function ProjectCard({ repo }: { repo: Repo }) {
	return (
		<a href={repo.url} target="_blank" rel="noopener noreferrer" className="block">
			<Card className="h-full">
				<h3 className="font-display text-lg font-bold">{repo.name}</h3>
				<p className="mt-1 text-sm text-muted-fg">{repo.description}</p>
				<div className="mt-4 flex flex-wrap gap-1.5">
					{repo.tags.map((t) => <Badge key={t}>{t}</Badge>)}
				</div>
			</Card>
		</a>
	);
}
