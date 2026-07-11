import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
	title: "Contact",
	description:
		"Open to backend and full-stack roles, freelance work, and collaboration. Reach out by email or find me on GitHub, LinkedIn, and Medium.",
	path: "/contact",
});

export default function ContactPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16">
			<SectionHeader eyebrow="Contact" title="Let's talk"
				intro="Open to backend and full-stack roles, freelance work, and collaboration. The fastest way to reach me is email." />
			<Stagger className="divide-y divide-border rounded-xl border border-border">
				{site.socials.map((s) => (
					<StaggerItem key={s.name}>
						<a href={s.url} target="_blank" rel="noopener noreferrer"
							className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-surface">
							<span><span className="font-display font-bold">{s.name}</span>
								<span className="ml-3 text-sm text-muted-fg">{s.label}</span></span>
							<ArrowUpRight size={18} className="text-muted-fg" />
						</a>
					</StaggerItem>
				))}
			</Stagger>
		</div>
	);
}
