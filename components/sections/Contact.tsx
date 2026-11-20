import { resumeUrl, socialLinks } from "@/content/links";
import Heading from "./Heading";

function display(url: string): string {
	return url.startsWith("mailto:") ? url.slice("mailto:".length) : url;
}

export default function Contact() {
	const [email, ...others] = socialLinks;

	return (
		<footer id="contact" aria-label="Contact" className="bg-red text-paper pt-24 md:pt-36 pb-10">
			<div className="container mx-auto px-4 sm:px-8 lg:px-16">
				<Heading
					text="Need something built? Let's talk."
					className="text-[clamp(3rem,10vw,9rem)] sm:text-[clamp(3rem,10vw,9rem)] lg:text-[clamp(3rem,10vw,9rem)] max-w-5xl"
				/>
				<p className="text-xl md:text-3xl font-semibold mt-8 max-w-2xl leading-snug">
					I&apos;m open to backend and AI engineering work. Email is the fastest
					way to reach me, and I read every message myself.
				</p>

				<a
					href={email.url}
					className="inline-block mt-10 bg-paper text-ink text-lg md:text-2xl font-extrabold px-6 py-4 break-all hover:bg-ink hover:text-paper active:translate-y-px transition-colors"
				>
					{display(email.url)}
				</a>

				<ul className="flex flex-wrap gap-x-10 gap-y-2 mt-12 text-xl font-bold">
					{[...others, { name: "My resume", url: resumeUrl }].map((link) => (
						<li key={link.name}>
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block py-3 underline decoration-2 underline-offset-4 hover:decoration-4"
							>
								{link.name}
							</a>
						</li>
					))}
				</ul>

				<p className="mt-20 font-semibold">
					© {new Date().getFullYear()} Zulfikar Ditya Antariksa, Jakarta
				</p>
			</div>
		</footer>
	);
}
