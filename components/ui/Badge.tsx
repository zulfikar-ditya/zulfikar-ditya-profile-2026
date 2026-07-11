import { cn } from "@/lib/utils";
export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
	return <span className={cn("inline-block rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-fg", className)}>{children}</span>;
}
