import type { Metadata } from "next";
import { fetchMediumArticles } from "@/lib/medium";
import { fallbackArticles } from "@/data/articles";
import { site } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { pageMetadata, breadcrumbJsonLd, collectionJsonLd } from "@/lib/seo";

export const revalidate = 86400;

const description =
	"I write about backend architecture, APIs, and developer workflow on Medium.";

export const metadata: Metadata = pageMetadata({
	title: "Articles",
	description,
	path: "/articles",
});

export default async function ArticlesPage() {
	const fetched = await fetchMediumArticles(site.mediumUsername);
	const articles = fetched.length ? fetched : fallbackArticles;

	const breadcrumb = breadcrumbJsonLd([
		{ name: "Home", url: site.url },
		{ name: "Articles", url: `${site.url}/articles` },
	]);

	const collection = collectionJsonLd({
		name: "Articles",
		description,
		url: `${site.url}/articles`,
		items: articles.map((a) => ({
			name: a.title,
			url: a.link,
			description: a.description,
		})),
	});

	return (
		<div className="mx-auto max-w-5xl px-6 py-16">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
			/>
			<SectionHeader eyebrow="Writing" title="Articles & notes"
				intro="I write about backend architecture, APIs, and developer workflow on Medium." />
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{articles.map((a) => <ArticleCard key={a.link} article={a} />)}
			</div>
		</div>
	);
}
