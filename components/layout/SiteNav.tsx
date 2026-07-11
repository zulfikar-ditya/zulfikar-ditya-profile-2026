"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

export function SiteNav() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
			<nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
				<Link href="/" className="font-display text-lg font-bold">{site.name}</Link>
				<div className="hidden items-center gap-6 md:flex">
					{site.nav.map((n) => (
						<Link key={n.href} href={n.href}
							className={cn("text-sm text-muted-fg transition-colors hover:text-foreground",
								isActive(n.href) && "text-foreground")}>
							{n.label}
						</Link>
					))}
					<Link href="/resume"
						className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90">
						Resume
					</Link>
					<ThemeToggle />
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}
						className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border">
						{open ? <X size={18} /> : <Menu size={18} />}
					</button>
				</div>
			</nav>
			{open && (
				<div className="border-t border-border px-6 py-4 md:hidden">
					<div className="flex flex-col gap-3">
						{[...site.nav, { href: "/resume", label: "Resume" }].map((n) => (
							<Link key={n.href} href={n.href} onClick={() => setOpen(false)}
								className={cn("text-sm text-muted-fg hover:text-foreground",
									isActive(n.href) && "text-foreground")}>{n.label}</Link>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
