import { site } from "@/data/site";

export function SiteFooter() {
	return (
		<footer className="border-t border-border">
			<div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-sm text-muted-fg">© {new Date().getFullYear()} {site.name}. {site.role}.</p>
				<div className="flex flex-wrap gap-4">
					{site.socials.map((s) => (
						<a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
							className="text-sm text-muted-fg transition-colors hover:text-accent">{s.name}</a>
					))}
				</div>
			</div>
		</footer>
	);
}
