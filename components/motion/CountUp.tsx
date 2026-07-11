"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function CountUp({ value, className }: { value: string; className?: string }) {
	const num = parseInt(value.replace(/\D/g, ""), 10);
	const suffix = value.replace(/[0-9]/g, "");
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-40px" });
	const reduce = useReducedMotion();
	const [n, setN] = useState(reduce ? num : 0);

	useEffect(() => {
		if (!inView || reduce || isNaN(num)) return;
		let raf = 0; const start = performance.now(); const dur = 900;
		const tick = (t: number) => {
			const p = Math.min((t - start) / dur, 1);
			setN(Math.round(p * num));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView, num, reduce]);

	return <span ref={ref} className={className}>{isNaN(num) ? value : `${n}${suffix}`}</span>;
}
