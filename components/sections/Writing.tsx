import { mediumUrl } from "@/content/links";
import { fetchMediumArticles } from "@/lib/medium";
import Count from "./Count";
import Heading from "./Heading";

const MAX_ROWS = 6;

function formatDate(value: string): string {
	return new Date(value).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export default async function Writing() {
	const articles = (await fetchMediumArticles("zulfikarditya"))
		.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
		.slice(0, MAX_ROWS);

	return (
		<section id="writing" aria-label="Things I've written" className="py-24 md:py-36">
			<div className="container mx-auto px-4 sm:px-8 lg:px-16 grid lg:grid-cols-[1fr_2fr] gap-x-16 gap-y-10">
				<div>
					<Heading text="Things I've written" effect="fold-side" className="lg:text-6xl" />
					<p className="text-xl mt-6 max-w-sm leading-relaxed">
						I write to explain how software works behind the scenes.{" "}
						<Count to={30} suffix="+" /> articles on Medium so
						far, read by <Count to={230} suffix="+" /> followers.
					</p>
					<a
						href={mediumUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block mt-8 bg-ink text-paper font-bold px-6 py-4 hover:bg-red active:translate-y-px transition-colors"
					>
						Read my articles on Medium
					</a>
				</div>

				{articles.length > 0 ? (
					<ol className="border-t-2 border-ink">
						{articles.map((article) => (
							<li key={article.link} className="border-b-2 border-ink">
								<a
									href={article.link}
									target="_blank"
									rel="noopener noreferrer"
									className="block py-5 hover:bg-white transition-colors"
								>
									<time
										dateTime={new Date(article.pubDate).toISOString()}
										className="block text-sm font-semibold tabular-nums"
									>
										{formatDate(article.pubDate)}
									</time>
									<span className="block text-xl md:text-2xl font-extrabold mt-1">
										{article.title}
									</span>
								</a>
							</li>
						))}
					</ol>
				) : (
					<p className="border-y-2 border-ink py-8 text-lg">
						The article list didn&apos;t load this time. Everything is still on
						Medium.
					</p>
				)}
			</div>
		</section>
	);
}
