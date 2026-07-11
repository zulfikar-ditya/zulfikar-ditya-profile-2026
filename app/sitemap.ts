import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = site.url;
	const lastModified = new Date();

	return [
		{
			url: baseUrl,
			lastModified,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${baseUrl}/work`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/projects`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/articles`,
			lastModified,
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${baseUrl}/resume`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.6,
		},
	];
}
