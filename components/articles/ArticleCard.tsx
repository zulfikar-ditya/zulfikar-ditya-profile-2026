import { Card } from "@/components/ui/Card";
import type { Article } from "@/data/articles";
import type { MediumArticle } from "@/lib/medium";

export function ArticleCard({ article }: { article: Article | MediumArticle }) {
	const parsedDate = new Date(article.pubDate);
	const date = Number.isNaN(parsedDate.getTime())
		? article.pubDate
		: parsedDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
	return (
		<a href={article.link} target="_blank" rel="noopener noreferrer" className="block">
			<Card className="h-full">
				<p className="text-xs text-accent">{date}</p>
				<h3 className="mt-1 font-display text-lg font-bold">{article.title}</h3>
				<p className="mt-2 text-sm text-muted-fg line-clamp-3">{article.description}</p>
			</Card>
		</a>
	);
}
