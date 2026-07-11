import { experience } from "@/data/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function WorkPreview() {
	const recent = experience.slice(0, 3);

	return (
		<section className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader
				eyebrow="Experience"
				title="Recent roles"
				intro="A snapshot of where I've shipped backend systems most recently."
			/>

			<Stagger className="grid gap-4 sm:grid-cols-3">
				{recent.map((job) => (
					<StaggerItem key={`${job.company}-${job.title}`}>
						<Card className="flex h-full flex-col">
							<h3 className="font-display text-lg font-semibold">{job.title}</h3>
							<p className="mt-1 text-sm text-accent">{job.company}</p>
							<p className="mt-1 text-xs uppercase tracking-wide text-muted-fg">
								{job.dateStart} — {job.dateEnd}
							</p>
							<ul className="mt-4 space-y-2 text-sm text-muted-fg">
								{job.descriptions.slice(0, 2).map((desc) => (
									<li key={desc}>{desc}</li>
								))}
							</ul>
						</Card>
					</StaggerItem>
				))}
			</Stagger>

			<div className="mt-8">
				<Button href="/work" variant="secondary">View full experience</Button>
			</div>
		</section>
	);
}
