import { fetchMediumArticles, type MediumArticle } from "@/lib/medium";

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function deduplicateCategories(categories: string[]): string[] {
	const seen = new Set<string>();
	return categories.filter((cat) => {
		const normalized = cat.toLowerCase().replace(/-/g, "");
		if (seen.has(normalized)) return false;
		seen.add(normalized);
		return true;
	});
}

export default async function BlogSection() {
	let articles: MediumArticle[] = await fetchMediumArticles("zulfikarditya");

	if (articles.length === 0) {
		articles = [];
	}

	// Sort by most recent
	articles.sort(
		(a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
	);

	return (
		<section id="blog" aria-label="Blog Articles" className="bg-p-base">
			<div className="container mx-auto px-8 lg:px-16 py-24 max-w-6xl">
				{/* Section label */}
				<p className="font-jetbrains text-xs tracking-[0.25em] text-p-accent uppercase mb-4">
					// 004
				</p>

				{/* Heading */}
				<h2 className="font-display text-5xl md:text-7xl font-bold text-p-ink mb-4 leading-tight">
					Blog
				</h2>

				<p className="font-jetbrains text-xs text-p-muted tracking-wide mb-10">
					Articles published on{" "}
					<a
						href="https://medium.com/@zulfikarditya"
						target="_blank"
						rel="noopener noreferrer"
						className="text-p-accent hover:underline"
					>
						medium.com/@zulfikarditya
					</a>
				</p>

				{/* Divider */}
				<div className="w-full h-px bg-p-border mb-16" />

				{articles.length > 0 ? (
					<div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3">
						{articles.map((article, index) => {
							const tags = deduplicateCategories(article.categories).slice(
								0,
								3
							);

							return (
								<a
									key={index}
									href={article.link}
									target="_blank"
									rel="noopener noreferrer"
									className="group bg-p-card border border-p-border hover:border-p-border-bright transition-all duration-300 block overflow-hidden"
								>
									{article.thumbnail && (
										<div className="w-full h-44 overflow-hidden">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={article.thumbnail}
												alt={article.title}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
											/>
										</div>
									)}

									<div className="p-6">
										<time className="font-jetbrains text-xs text-p-muted tracking-wide">
											{formatDate(article.pubDate)}
										</time>

										<h3 className="font-display text-base font-bold text-p-ink mt-2 mb-3 group-hover:text-p-accent transition-colors duration-300 line-clamp-2">
											{article.title}
										</h3>

										<p className="text-p-muted text-sm mb-5 line-clamp-3 leading-relaxed">
											{article.description}
										</p>

										{tags.length > 0 && (
											<div className="flex flex-wrap gap-2">
												{tags.map((tag, tagIndex) => (
													<span
														key={tagIndex}
														className="px-2.5 py-1 text-xs font-jetbrains border border-p-border text-p-muted tracking-wide"
													>
														{tag}
													</span>
												))}
											</div>
										)}
									</div>
								</a>
							);
						})}
					</div>
				) : (
					<p className="font-jetbrains text-sm text-p-muted tracking-wide">
						No articles available at this time.
					</p>
				)}

				<div className="mt-12">
					<a
						href="https://medium.com/@zulfikarditya"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-3 px-5 py-3 bg-p-card border border-p-border text-p-muted hover:border-p-accent/50 hover:text-p-accent transition-all duration-200"
					>
						<span className="font-jetbrains text-xs tracking-[0.2em] uppercase">
							View all articles
						</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M7 7h10v10" />
							<path d="M7 17L17 7" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
