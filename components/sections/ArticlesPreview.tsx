import { site } from "@/data/site";
import { fallbackArticles } from "@/data/articles";
import { fetchMediumArticles } from "@/lib/medium";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

function formatDate(pubDate: string) {
	const date = new Date(pubDate);
	if (Number.isNaN(date.getTime())) return pubDate;
	return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export async function ArticlesPreview() {
	const fetched = await fetchMediumArticles(site.mediumUsername);
	const list = (fetched.length ? fetched : fallbackArticles).slice(0, 3);

	return (
		<section className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader
				eyebrow="Writing"
				title="Latest articles"
				intro="Notes on backend architecture, performance, and shipping reliable systems."
			/>

			<Stagger className="grid gap-4 sm:grid-cols-3">
				{list.map((article) => (
					<StaggerItem key={article.link}>
						<a href={article.link} target="_blank" rel="noopener noreferrer" className="block h-full">
							<Card className="flex h-full flex-col">
								<p className="text-xs uppercase tracking-wide text-muted-fg">
									{formatDate(article.pubDate)}
								</p>
								<h3 className="mt-2 font-display text-lg font-semibold">{article.title}</h3>
								<p className="mt-2 text-sm text-muted-fg">{article.description}</p>
							</Card>
						</a>
					</StaggerItem>
				))}
			</Stagger>

			<div className="mt-8">
				<Button href="/articles" variant="secondary">Read all articles</Button>
			</div>
		</section>
	);
}
