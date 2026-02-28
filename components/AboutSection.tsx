import SplitText from "@/components/react-bits/SplitText/SplitText";
import SkillCard from "./SkillCard";

const skillsData = {
	languages: ["PHP", "TypeScript", "JavaScript", "Golang"],
	backendFrameworks: [
		"Laravel",
		"NestJS",
		"Express",
		"Fastify",
		"Hono",
		"Elysia",
		"Fiber",
		"Gin",
	],
	databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
	systemArchitecture: [
		"RESTful API Design",
		"OAuth & JWT Auth",
		"Clean Architecture",
		"DTOs & Validation",
		"Queue Workers",
		"Horizontal Scaling",
		"Caching Strategy",
	],
	devops: [
		"Docker",
		"Nginx",
		"GitHub Actions",
		"GitLab CI/CD",
		"Server Configuration",
		"Deployment Pipelines",
	],
	monitoring: [
		"Logging & Metrics",
		"Uptime Monitoring",
		"Incident Handling",
		"Query Performance Tuning",
		"Load Optimization",
	],
	frontend: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
	orm: ["Eloquent", "Drizzle ORM", "Prisma", "BullMQ"],
};

export default function AboutSection() {
	return (
		<section id="about-me" aria-label="About Me" className="bg-p-surface">
			<div className="container mx-auto px-8 lg:px-16 py-24 max-w-6xl">
				{/* Section label */}
				<p className="font-jetbrains text-xs tracking-[0.25em] text-p-accent uppercase mb-4">
					// 001
				</p>

				{/* Heading */}
				<h2 className="font-display text-5xl md:text-7xl font-bold text-p-ink mb-10 leading-tight">
					<SplitText
						text="About Me"
						tag="span"
						delay={50}
						duration={0.5}
						ease="power3.out"
						splitType="chars"
						from={{ opacity: 0, y: 20 }}
						to={{ opacity: 1, y: 0 }}
						threshold={0.1}
						rootMargin="-50px"
						textAlign="left"
					/>
				</h2>

				{/* Divider */}
				<div className="w-full h-px bg-p-border mb-14" />

				{/* Bio */}
				<p className="text-lg md:text-xl leading-relaxed text-p-muted mb-16 max-w-4xl">
					Backend Engineer with{" "}
					<span className="text-p-accent font-semibold">
						5+ years of experience
					</span>{" "}
					building reliable, secure, and high-performance backend systems.
					Demonstrated expertise in{" "}
					<span className="text-p-accent font-semibold">clean architecture</span>
					,{" "}
					<span className="text-p-accent font-semibold">
						scalable API design
					</span>
					, and efficient data workflows using{" "}
					<span className="text-p-accent font-semibold">
						Laravel, Node.js, Bun, and Go
					</span>
					. Proven track record of{" "}
					<span className="text-p-accent font-semibold">
						optimizing database performance by 30%
					</span>
					,{" "}
					<span className="text-p-accent font-semibold">
						reducing production issues by 75%
					</span>
					, and maintaining{" "}
					<span className="text-p-accent font-semibold">
						99.9% application uptime
					</span>
					. Strong foundation in{" "}
					<span className="text-p-accent font-semibold">
						PostgreSQL and MySQL optimization
					</span>
					,{" "}
					<span className="text-p-accent font-semibold">
						Redis caching strategies
					</span>
					, and cloud deployment with{" "}
					<span className="text-p-accent font-semibold">
						Docker and CI/CD pipelines
					</span>
					. Active technical writer with{" "}
					<span className="text-p-accent font-semibold">
						30+ published articles
					</span>{" "}
					on Medium reaching{" "}
					<span className="text-p-accent font-semibold">190+ followers</span>.
				</p>

				{/* Skills grid */}
				<div className="grid md:grid-cols-2 gap-3">
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

				<div className="mt-3">
					<SkillCard
						title="Frontend (Support Level)"
						skills={skillsData.frontend}
						accentColor="#9d7fff"
					/>
				</div>
			</div>
		</section>
	);
}
