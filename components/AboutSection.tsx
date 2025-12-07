import SplitText from "@/components/react-bits/SplitText/SplitText";
import SkillCard from "./SkillCard";

const skillsData = {
	languages: ["PHP", "TypeScript", "JavaScript", "Golang"],
	backendFrameworks: [
		"Laravel",
		"NestJS",
		"Express",
		"Elysia",
		"Hono",
		"Fastify",
		"Fiber",
		"Gin",
	],
	databases: ["PostgreSQL", "MySQL", "MongoDB"],
	systemArchitecture: [
		"API Design",
		"Auth/Authorization",
		"Clean Architecture",
		"Caching Strategy",
		"Horizontal Scaling",
	],
	devops: [
		"Docker",
		"GitHub Actions",
		"GitLab CI/CD",
		"Versioning",
		"Deployment Pipelines",
	],
	monitoring: [
		"Logging",
		"Metrics",
		"Uptime Monitoring",
		"Incident Handling",
		"Load Optimization",
	],
	frontend: ["React", "Next.js", "Tailwind"],
};

export default function AboutSection() {
	return (
		<section id="about-me" className="container mx-auto px-4 py-20">
			<div className="max-w-5xl mx-auto">
				<h2 className="text-5xl font-bold mb-12 text-center">
					<SplitText
						text="About Me"
						className=""
						delay={50}
						duration={0.5}
						ease="power3.out"
						splitType="chars"
						from={{ opacity: 0, y: 20 }}
						to={{ opacity: 1, y: 0 }}
						threshold={0.1}
						rootMargin="-50px"
						textAlign="center"
					/>
				</h2>

				<div className="mb-16">
					<p className="text-xl leading-relaxed text-gray-300">
						Backend-focused engineer with{" "}
						<span className="text-[#00bba7] font-semibold">
							5+ years of experience
						</span>{" "}
						building secure APIs, scalable backend services, and
						high-availability systems using Laravel & NestJS. Strong focus on
						clean architecture, database optimization, and cloud deployment with
						proven ability to improve performance and system reliability.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					<SkillCard title="Languages" skills={skillsData.languages} />
					<SkillCard
						title="Backend Frameworks"
						skills={skillsData.backendFrameworks}
					/>
					<SkillCard title="Database Systems" skills={skillsData.databases} />
					<SkillCard
						title="System Architecture"
						skills={skillsData.systemArchitecture}
					/>
					<SkillCard title="DevOps" skills={skillsData.devops} />
					<SkillCard
						title="Monitoring & Reliability"
						skills={skillsData.monitoring}
					/>
				</div>

				<div className="mt-8">
					<SkillCard
						title="Frontend (Support Level)"
						skills={skillsData.frontend}
						accentColor="#e12afb"
					/>
				</div>
			</div>
		</section>
	);
}
