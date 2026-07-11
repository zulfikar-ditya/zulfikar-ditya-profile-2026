import { site } from "@/data/site";
import { skills } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function AboutPreview() {
	return (
		<section className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader
				eyebrow="About"
				title="Backend systems, built to last"
				intro={`${site.valueProp} Based in ${site.location}.`}
			/>

			<Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3">
				{site.stats.map((stat) => (
					<StaggerItem key={stat.label}>
						<StatTile value={stat.value} label={stat.label} />
					</StaggerItem>
				))}
			</Stagger>

			<Reveal delay={0.1} className="mt-10">
				<div className="space-y-6">
					{skills.map((group) => (
						<div key={group.category}>
							<p className="mb-2 text-sm font-medium text-muted-fg">{group.category}</p>
							<div className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<Badge key={item}>{item}</Badge>
								))}
							</div>
						</div>
					))}
				</div>
			</Reveal>
		</section>
	);
}
