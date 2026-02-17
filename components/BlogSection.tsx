import { fetchMediumArticles, type MediumArticle } from "@/lib/medium";
import fallbackArticles from "@/public/mock/articles.json";

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
		// articles = fallbackArticles as MediumArticle[];
		articles = [];
	}

	// Sort by most recent
	articles.sort(
		(a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
	);

	return (
		<section id="blog" aria-label="Blog Articles" className="py-20 bg-black">
			<div className="container mx-auto px-4">
				<h2 className="text-5xl font-bold text-center mb-4 text-white">
					Blog
				</h2>
				<p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
					Articles I&apos;ve written on{" "}
					<a
						href="https://medium.com/@zulfikarditya"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#00bba7] hover:underline"
					>
						Medium
					</a>
				</p>

				<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
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
								className="group bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all hover:bg-zinc-800"
							>
								{article.thumbnail && (
									<div className="w-full h-48 overflow-hidden">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={article.thumbnail}
											alt={article.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
								)}

								<div className="p-6">
									<div className="flex items-center gap-2 mb-3">
										<time className="text-xs text-gray-500">
											{formatDate(article.pubDate)}
										</time>
									</div>

									<h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00bba7] transition-colors line-clamp-2">
										{article.title}
									</h3>

									<p className="text-gray-400 text-sm mb-4 line-clamp-3">
										{article.description}
									</p>

									{tags.length > 0 && (
										<div className="flex flex-wrap gap-2">
											{tags.map((tag, tagIndex) => (
												<span
													key={tagIndex}
													className="px-2 py-1 text-xs bg-black text-gray-300 rounded-md border border-zinc-700"
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

				<div className="text-center mt-12">
					<a
						href="https://medium.com/@zulfikarditya"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-full border border-zinc-700 hover:border-[#00bba7] hover:text-[#00bba7] transition-colors"
					>
						View all articles on Medium
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
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
