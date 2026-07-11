import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkTimeline } from "@/components/work/WorkTimeline";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { pageMetadata, breadcrumbJsonLd, collectionJsonLd } from "@/lib/seo";

const description =
	"Backend and full-stack roles across product teams, agencies, and freelance clients.";

export const metadata: Metadata = pageMetadata({
	title: "Work Experience",
	description,
	path: "/work",
});

export default function WorkPage() {
	const breadcrumb = breadcrumbJsonLd([
		{ name: "Home", url: site.url },
		{ name: "Work Experience", url: `${site.url}/work` },
	]);

	const collection = collectionJsonLd({
		name: "Work Experience",
		description,
		url: `${site.url}/work`,
		items: experience.map((role) => ({
			name: `${role.title} at ${role.company}`,
			description: role.descriptions[0],
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
			<SectionHeader eyebrow="Experience" title="Where I've worked"
				intro="Backend and full-stack roles across product teams, agencies, and freelance clients." />
			<WorkTimeline />
		</div>
	);
}
