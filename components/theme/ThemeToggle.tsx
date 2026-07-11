"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
	const { theme, toggle } = useTheme();
	return (
		<button
			onClick={toggle}
			aria-label="Toggle theme"
			className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-fg transition-colors hover:text-foreground hover:border-accent"
		>
			{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	);
}
