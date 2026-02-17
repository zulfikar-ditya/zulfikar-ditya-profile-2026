export interface MediumArticle {
	title: string;
	link: string;
	pubDate: string;
	categories: string[];
	thumbnail: string | null;
	description: string;
}

function extractCDATA(xml: string, tag: string): string {
	const regex = new RegExp(
		`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`,
		"i"
	);
	const match = xml.match(regex);
	return match ? match[1].trim() : "";
}

function extractTag(xml: string, tag: string): string {
	const regex = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i");
	const match = xml.match(regex);
	return match ? match[1].trim() : "";
}

function extractAllCDATA(xml: string, tag: string): string[] {
	const regex = new RegExp(
		`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`,
		"gi"
	);
	const matches = [...xml.matchAll(regex)];
	return matches.map((m) => m[1].trim());
}

function extractFirstImage(html: string): string | null {
	const match = html.match(/<img[^>]+src="([^"]+)"/i);
	return match ? match[1] : null;
}

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, "")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, " ")
		.trim();
}

function extractDescription(html: string): string {
	const paragraphs = html.match(/<p>([\s\S]*?)<\/p>/gi) || [];
	for (const p of paragraphs) {
		const text = stripHtml(p);
		if (text.length > 50) {
			return text.length > 200 ? text.substring(0, 200) + "…" : text;
		}
	}
	const plain = stripHtml(html);
	return plain.length > 200 ? plain.substring(0, 200) + "…" : plain;
}

function parseMediumRSS(xml: string): MediumArticle[] {
	const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

	return items.map((item) => {
		const title = extractCDATA(item, "title");
		const link = extractTag(item, "link");
		const pubDate = extractTag(item, "pubDate");
		const categories = extractAllCDATA(item, "category");
		const content = extractCDATA(item, "content:encoded");
		const thumbnail = extractFirstImage(content);
		const description = extractDescription(content);

		return { title, link, pubDate, categories, thumbnail, description };
	});
}

export async function fetchMediumArticles(
	username: string
): Promise<MediumArticle[]> {
	try {
		const res = await fetch(`https://medium.com/feed/@${username}`, {
			next: { revalidate: 86400 },
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch RSS feed: ${res.status}`);
		}

		const xml = await res.text();
		return parseMediumRSS(xml);
	} catch (error) {
		console.error("Error fetching Medium articles:", error);
		return [];
	}
}
