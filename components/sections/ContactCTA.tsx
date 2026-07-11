import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function ContactCTA() {
	return (
		<section className="mx-auto max-w-5xl px-6 py-16">
			<Reveal className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-surface p-10 sm:items-center sm:text-center">
				<h2 className="font-display text-3xl font-bold sm:text-4xl">Let&apos;s build something reliable</h2>
				<p className="max-w-xl text-muted-fg">
					Open to backend engineering roles and freelance work — clean APIs, tuned databases, and
					infrastructure that doesn&apos;t page you at 3am.
				</p>
				<div className="flex flex-wrap gap-3 sm:justify-center">
					<Button href="/contact">Get in touch</Button>
					<Button href={`mailto:${site.email}`} variant="secondary">Email me</Button>
				</div>
			</Reveal>
		</section>
	);
}
