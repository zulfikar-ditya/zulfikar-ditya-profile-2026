export function SectionHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
	return (
		<div className="mb-8 max-w-2xl">
			<p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">{eyebrow}</p>
			<h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
			{intro && <p className="mt-3 text-muted-fg">{intro}</p>}
		</div>
	);
}
