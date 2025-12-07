interface SkillBadgeProps {
	skill: string;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
	return (
		<span className="px-4 py-2 bg-gray-600 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
			{skill}
		</span>
	);
}
