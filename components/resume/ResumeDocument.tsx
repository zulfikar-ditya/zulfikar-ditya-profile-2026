import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

export function ResumeDocument() {
	return (
		<article className="rounded-xl border border-border bg-surface p-8 sm:p-10 print:rounded-none print:border-none print:bg-white print:p-0 print:text-black">
			<header className="border-b border-border pb-6 print:border-black/20">
				<h1 className="font-display text-3xl font-bold sm:text-4xl">{site.name}</h1>
				<p className="mt-1 text-lg text-muted-fg print:text-black/70">
					{site.role} · {site.tagline}
				</p>
				<ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-fg print:text-black/70">
					<li>{site.email}</li>
					<li>{site.location}</li>
					{site.socials
						.filter((s) => s.name !== "Email")
						.map((s, i) => (
							<li key={`${s.name}-${i}`}>
								<a
									href={s.url}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-accent print:text-black"
								>
									{s.name}: {s.label}
								</a>
							</li>
						))}
				</ul>
			</header>

			<section className="mt-8">
				<h2 className="font-display text-xl font-bold">Summary</h2>
				<p className="mt-2 text-sm leading-relaxed text-muted-fg print:text-black/80">{site.valueProp}</p>
			</section>

			<section className="mt-8">
				<h2 className="font-display text-xl font-bold">Experience</h2>
				<div className="mt-4 space-y-6">
					{experience.map((e, i) => (
						<div key={`${e.company}-${e.title}-${i}`} className="break-inside-avoid">
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
								<h3 className="text-base font-semibold">{e.title}</h3>
								<p className="text-xs text-accent print:text-black/70">
									{e.dateStart} – {e.dateEnd}
								</p>
							</div>
							<p className="text-sm text-muted-fg print:text-black/70">
								{e.company} · {e.type}
							</p>
							<ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-fg print:text-black/80">
								{e.descriptions.map((d, j) => (
									<li key={j}>{d}</li>
								))}
							</ul>
							{e.skills.length > 0 && (
								<p className="mt-2 text-xs text-muted-fg print:text-black/60">
									{e.skills.join(" · ")}
								</p>
							)}
						</div>
					))}
				</div>
			</section>

			<section className="mt-8">
				<h2 className="font-display text-xl font-bold">Skills</h2>
				<div className="mt-4 space-y-4">
					{skills.map((group, i) => (
						<div key={`${group.category}-${i}`}>
							<h3 className="text-sm font-semibold text-foreground">{group.category}</h3>
							<div className="mt-1.5 flex flex-wrap gap-1.5">
								{group.items.map((item, j) => (
									<span
										key={`${item}-${j}`}
										className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-fg print:border-black/20 print:bg-white print:text-black/80"
									>
										{item}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</section>
		</article>
	);
}
