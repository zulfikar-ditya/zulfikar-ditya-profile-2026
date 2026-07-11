import { Download } from "lucide-react";
import { site } from "@/data/site";
import { ResumeDocument } from "@/components/resume/ResumeDocument";

export default function ResumePage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16">
			<div className="mb-8 flex items-center justify-between print:hidden">
				<h1 className="font-display text-3xl font-bold">Resume</h1>
				{/* TODO: once public/resume.pdf is added, switch href to site.resumePdf and add the `download` attribute */}
				<a
					href={site.resumeUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90"
				>
					<Download size={16} /> Download PDF
				</a>
			</div>
			<ResumeDocument />
		</div>
	);
}
