import { site } from "@/data/site";
import { fallbackArticles } from "@/data/articles";
import { fetchMediumArticles } from "@/lib/medium";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArticleCard } from "@/components/articles/ArticleCard";

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
						<ArticleCard article={article} />
					</StaggerItem>
				))}
			</Stagger>

			<div className="mt-8">
				<Button href="/articles" variant="secondary">Read all articles</Button>
			</div>
		</section>
	);
}
