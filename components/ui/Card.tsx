import { cn } from "@/lib/utils";
export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
	return <div className={cn("rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-sm", className)}>{children}</div>;
}
