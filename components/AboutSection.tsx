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
		<section
			id="about-me"
			aria-label="About Me"
			className="container mx-auto px-4 py-20"
		>
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
						Backend Engineer with{" "}
						<span className="text-[#00bba7] font-semibold">
							5+ years of experience
						</span>{" "}
						building reliable, secure, and high-performance backend systems.
						Demonstrated expertise in{" "}
						<span className="text-[#00bba7] font-semibold">
							clean architecture
						</span>
						,{" "}
						<span className="text-[#00bba7] font-semibold">
							scalable API design
						</span>
						, and efficient data workflows using{" "}
						<span className="text-[#00bba7] font-semibold">
							Laravel, Node.js, Bun, pand Go
						</span>
						. Proven track record of{" "}
						<span className="text-[#00bba7] font-semibold">
							optimizing database performance by 30%
						</span>
						,{" "}
						<span className="text-[#00bba7] font-semibold">
							reducing production issues by 75%
						</span>
						, and maintaining{" "}
						<span className="text-[#00bba7] font-semibold">
							99.9% application uptime
						</span>
						. Strong foundation in{" "}
						<span className="text-[#00bba7] font-semibold">
							PostgreSQL and MySQL optimization
						</span>
						,{" "}
						<span className="text-[#00bba7] font-semibold">
							Redis caching strategies
						</span>
						, and cloud deployment with{" "}
						<span className="text-[#00bba7] font-semibold">
							Docker and CI/CD pipelines
						</span>
						. Active technical writer with{" "}
						<span className="text-[#00bba7] font-semibold">
							30+ published articles
						</span>{" "}
						on Medium covering Laravel best practices, API design patterns, and
						backend optimization techniques, reaching{" "}
						<span className="text-[#00bba7] font-semibold">190+ followers</span>
						. Experienced in{" "}
						<span className="text-[#00bba7] font-semibold">
							leading development teams
						</span>{" "}
						and coordinating full-stack projects from architecture design
						through production deployment, with proven ability to deliver
						complex applications on time and within scope.
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
