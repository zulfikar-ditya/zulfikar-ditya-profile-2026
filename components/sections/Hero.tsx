"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Hero() {
	const reduce = useReducedMotion();
	const rise = (d: number) => ({
		initial: reduce ? false : { opacity: 0, y: 24 },
		animate: reduce ? undefined : { opacity: 1, y: 0 },
		transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as const },
	});
	return (
		<section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
			<div>
				<motion.p {...rise(0)} className="mb-3 text-sm font-medium uppercase tracking-wide text-accent">
					{site.role}
				</motion.p>
				<motion.h1 {...rise(0.08)} className="font-display text-5xl font-extrabold leading-tight sm:text-6xl">
					{site.name}
				</motion.h1>
				<motion.p {...rise(0.16)} className="mt-4 text-lg text-muted-fg">{site.valueProp}</motion.p>
				<motion.div {...rise(0.24)} className="mt-8 flex gap-3">
					<Button href="/work">View work</Button>
					<Button href="/contact" variant="secondary">Contact</Button>
				</motion.div>
			</div>
			<motion.div {...rise(0.2)} className="flex justify-center">
				<div className="rounded-2xl border border-border bg-surface p-3 shadow-sm ring-1 ring-accent/10">
					<Image src="/octocat.png" alt={site.name} width={320} height={320}
						className="rounded-xl" priority />
				</div>
			</motion.div>
		</section>
	);
}
