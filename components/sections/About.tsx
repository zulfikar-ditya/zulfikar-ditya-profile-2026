import { getYearsOfExperience } from "@/lib/experience";
import Heading from "./Heading";

/**
 * One text for two readers: each paragraph says it in everyday words first,
 * then names the technical thing for the people who know it.
 */
export default function About() {
	return (
		<section id="about" aria-label="About me" className="py-24 md:py-36">
			<div className="container mx-auto px-4 sm:px-8 lg:px-16">
				<Heading text="So, what do I actually do?" />

				<div className="mt-12 max-w-3xl space-y-8 text-xl md:text-2xl leading-relaxed">
					<p>
						When you tap a button in an app, something far away has to check who
						you are, find your data, and send back the right answer in under a
						second. I build that part. Engineers call it the backend: the APIs,
						databases and queues behind the screen. Mine are mostly built with
						Laravel and NestJS, with Go, Bun and Python (FastAPI) where they fit.
					</p>
					<p>
						Since 2026 I&apos;ve also built products on top of AI models. One
						is an assistant for a government&apos;s public documents. You ask a
						question the way you&apos;d ask a colleague. The assistant
						reads through thousands of documents and
						answers, and it shows which document the answer came from so you can
						check it yourself. The technical name is retrieval augmented
						generation, or RAG. I build the whole pipeline: splitting and indexing
						the documents, searching them with pgvector and Qdrant, and adding
						guardrails so there is a safe fallback when a model&apos;s answer
						can&apos;t be trusted.
					</p>
					<p>
						I&apos;ve done this for {getYearsOfExperience()} years, for loyalty
						programs, business software, a railway company, and a government&apos;s
						public documents. I learn most things by doing them, and I write
						down what I learn so the next person has it easier.
					</p>
				</div>
			</div>
		</section>
	);
}
