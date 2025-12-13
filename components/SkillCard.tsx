import SkillBadge from "./SkillBadge";

interface SkillCardProps {
	title: string;
	skills: string[];
	accentColor?: string;
}

export default function SkillCard({
	title,
	skills,
	accentColor = "#00bba7",
}: SkillCardProps) {
	return (
		<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
			<h3 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>
				{title}
			</h3>
			<div className="flex flex-wrap gap-3">
				{skills.map((skill) => (
					<SkillBadge key={skill} skill={skill} />
				))}
			</div>
		</div>
	);
}
