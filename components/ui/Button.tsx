import Link from "next/link";
import { cn } from "@/lib/utils";

const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all";
const variants = {
	primary: "bg-accent text-accent-fg hover:opacity-90",
	secondary: "border border-border text-foreground hover:border-accent",
	ghost: "text-muted-fg hover:text-foreground",
};

type Props = {
	variant?: keyof typeof variants;
	href?: string;
	className?: string;
	children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ variant = "primary", href, className, children, ...rest }: Props) {
	const cls = cn(base, variants[variant], className);
	if (href) return <Link href={href} className={cls} {...rest}>{children}</Link>;
	return (
		<button className={cls} {...(rest as unknown as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
			{children}
		</button>
	);
}
