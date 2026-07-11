import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { WorkPreview } from "@/components/sections/WorkPreview";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { site } from "@/data/site";

const profileJsonLd = {
	"@context": "https://schema.org",
	"@type": "ProfilePage",
	dateCreated: "2026-01-01",
	mainEntity: {
		"@type": "Person",
		name: site.name,
		alternateName: site.role,
		description: site.valueProp,
		url: site.url,
		email: site.email,
		sameAs: site.socials
			.filter((s) => s.name !== "Email")
			.map((s) => s.url),
	},
};

export default function Home() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
			/>
			<Hero />
			<div className="divide-y divide-border">
				<AboutPreview />
				<WorkPreview />
				<ProjectsPreview />
				<ArticlesPreview />
				<ContactCTA />
			</div>
		</>
	);
}
