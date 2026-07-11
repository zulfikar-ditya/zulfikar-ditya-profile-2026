"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
	theme: "light",
	toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light");

	// Deliberately deferred to an effect: `theme` must start as "light" to match
	// the SSR markup exactly (avoiding a hydration mismatch), then get corrected
	// to the real value ThemeScript already applied to <html> before paint.
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
	}, []);

	const toggle = () => {
		setTheme((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			document.documentElement.classList.toggle("dark", next === "dark");
			try { localStorage.setItem("theme", next); } catch {}
			return next;
		});
	};

	return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
