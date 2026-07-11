import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { WorkPreview } from "@/components/sections/WorkPreview";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
	return (
		<>
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
