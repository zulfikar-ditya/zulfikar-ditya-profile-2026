"use client";
import { motion, useReducedMotion } from "motion/react";

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
	const reduce = useReducedMotion();
	return (
		<motion.div className={className}
			initial={reduce ? false : "hidden"}
			whileInView={reduce ? undefined : "show"}
			viewport={{ once: true, margin: "-80px" }}
			variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
			{children}
		</motion.div>
	);
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<motion.div className={className}
			variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
			{children}
		</motion.div>
	);
}
