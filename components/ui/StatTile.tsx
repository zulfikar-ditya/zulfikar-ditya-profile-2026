import { CountUp } from "@/components/motion/CountUp";
export function StatTile({ value, label }: { value: string; label: string }) {
	return (
		<div className="rounded-xl border border-border bg-surface p-6">
			<CountUp value={value} className="font-display text-4xl font-bold text-accent" />
			<p className="mt-1 text-sm text-muted-fg">{label}</p>
		</div>
	);
}
