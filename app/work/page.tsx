import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkTimeline } from "@/components/work/WorkTimeline";

export default function WorkPage() {
	return (
		<div className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader eyebrow="Experience" title="Where I've worked"
				intro="Backend and full-stack roles across product teams, agencies, and freelance clients." />
			<WorkTimeline />
		</div>
	);
}
