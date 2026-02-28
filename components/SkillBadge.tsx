interface SkillBadgeProps {
	skill: string;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
	return (
		<span className="px-3 py-1 text-xs border border-p-border text-p-muted hover:border-p-accent/40 hover:text-p-ink transition-all duration-200 font-jetbrains tracking-wide">
			{skill}
		</span>
	);
}
