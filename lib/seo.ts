import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetadataInput = {
	title: string;
	description: string;
	path: string;
};

/**
 * Builds per-route Metadata. `title` is a plain string — the root layout's
 * title template (`%s | Zulfikar Ditya`) appends the site name automatically.
 */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
	const url = `${site.url}${path}`;

	return {
		title,
		description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			title,
			description,
			url,
			type: "website",
			siteName: site.name,
			images: ["/og-image.png"],
			locale: "en_US",
		},
	};
}

export type BreadcrumbItem = {
	name: string;
	url: string;
};

/**
 * schema.org BreadcrumbList JSON-LD. Pass items in order, e.g.
 * [{ name: "Home", url: site.url }, { name: "Work Experience", url: `${site.url}/work` }].
 */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export type CollectionListItem = {
	name: string;
	url?: string;
	description?: string;
};

type CollectionJsonLdInput = {
	name: string;
	description: string;
	url: string;
	items: CollectionListItem[];
};

/**
 * schema.org CollectionPage JSON-LD wrapping an ItemList of the page's
 * content (roles, repos, articles, ...).
 */
export function collectionJsonLd({ name, description, url, items }: CollectionJsonLdInput) {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name,
		description,
		url,
		mainEntity: {
			"@type": "ItemList",
			itemListElement: items.map((item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: item.name,
				...(item.url ? { url: item.url } : {}),
				...(item.description ? { description: item.description } : {}),
			})),
		},
	};
}
