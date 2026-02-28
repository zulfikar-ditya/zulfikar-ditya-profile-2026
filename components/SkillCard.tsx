import SkillBadge from "./SkillBadge";

interface SkillCardProps {
	title: string;
	skills: string[];
	accentColor?: string;
}

export default function SkillCard({
	title,
	skills,
	accentColor = "#c4ff00",
}: SkillCardProps) {
	return (
		<div className="p-6 bg-p-card border border-p-border hover:border-p-border-bright transition-all duration-300">
			<p
				className="text-xs tracking-[0.25em] uppercase mb-5 font-jetbrains font-medium"
				style={{ color: accentColor }}
			>
				{title}
			</p>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill) => (
					<SkillBadge key={skill} skill={skill} />
				))}
			</div>
		</div>
	);
}
