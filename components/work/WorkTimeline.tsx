import { experience } from "@/data/experience";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";

export function WorkTimeline() {
	return (
		<div className="relative">
			<div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" aria-hidden />
			<div className="space-y-10">
				{experience.map((e, i) => (
					<Reveal key={`${e.company}-${i}`} className={`relative pl-12 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:pl-0 md:text-right"}`}>
						<div className="rounded-xl border border-border bg-surface p-6 text-left">
							<h3 className="font-display text-xl font-bold">{e.title}</h3>
							<p className="text-sm text-muted-fg">{e.company} · {e.type}</p>
							<p className="mt-1 text-xs text-accent">{e.dateStart} – {e.dateEnd}</p>
							<ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted-fg">
								{e.descriptions.map((d, j) => <li key={j}>{d}</li>)}
							</ul>
							<div className="mt-4 flex flex-wrap gap-1.5">
								{e.skills.map((s, k) => <Badge key={`${s}-${k}`}>{s}</Badge>)}
							</div>
						</div>
					</Reveal>
				))}
			</div>
		</div>
	);
}
