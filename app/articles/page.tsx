import { fetchMediumArticles } from "@/lib/medium";
import { fallbackArticles } from "@/data/articles";
import { site } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArticleCard } from "@/components/articles/ArticleCard";

export const revalidate = 86400;

export default async function ArticlesPage() {
	const fetched = await fetchMediumArticles(site.mediumUsername);
	const articles = fetched.length ? fetched : fallbackArticles;
	return (
		<div className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader eyebrow="Writing" title="Articles & notes"
				intro="I write about backend architecture, APIs, and developer workflow on Medium." />
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{articles.map((a) => <ArticleCard key={a.link} article={a} />)}
			</div>
		</div>
	);
}
