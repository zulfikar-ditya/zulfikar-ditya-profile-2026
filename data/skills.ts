export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
	{
		category: "Languages",
		items: ["PHP", "TypeScript", "JavaScript", "Golang"],
	},
	{
		category: "Backend Frameworks",
		items: [
			"Laravel",
			"NestJS",
			"Express",
			"Fastify",
			"Hono",
			"Elysia",
			"Fiber",
			"Gin",
		],
	},
	{
		category: "Database Systems",
		items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
	},
	{
		category: "System Architecture",
		items: [
			"RESTful API Design",
			"OAuth & JWT Auth",
			"Clean Architecture",
			"DTOs & Validation",
			"Queue Workers",
			"Horizontal Scaling",
			"Caching Strategy",
		],
	},
	{
		category: "DevOps",
		items: [
			"Docker",
			"Nginx",
			"GitHub Actions",
			"GitLab CI/CD",
			"Server Configuration",
			"Deployment Pipelines",
		],
	},
	{
		category: "Monitoring & Reliability",
		items: [
			"Logging & Metrics",
			"Uptime Monitoring",
			"Incident Handling",
			"Query Performance Tuning",
			"Load Optimization",
		],
	},
	{
		category: "Frontend (Support Level)",
		items: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
	},
	{
		category: "ORM",
		items: ["Eloquent", "Drizzle ORM", "Prisma", "BullMQ"],
	},
];
