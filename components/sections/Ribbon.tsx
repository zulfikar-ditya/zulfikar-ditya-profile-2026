"use client";

import { useState } from "react";
import { TextLoop } from "@/components/react-bits";

/**
 * A moving band of a few words, between the ride and the page below it. The
 * band keeps moving, so it has a visible stop button (it also stops on hover
 * and when it is off screen).
 */
export default function Ribbon({ text }: { text: string }) {
	const [paused, setPaused] = useState(false);

	return (
		<div className="bg-ink text-paper pt-6 pb-2">
			<div className="relative overflow-hidden" style={{ aspectRatio: "1200 / 132" }}>
				<TextLoop
					text={text}
					separator="/"
					shape="line"
					speed={paused ? 0 : 80}
					fontSize={64}
					fontWeight={900}
					letterSpacing={0}
					uppercase={false}
					color="var(--color-ink)"
					ribbonColor="var(--color-marigold)"
					ribbonWidth={112}
					className="absolute! left-0 top-1/2 -translate-y-1/2 font-sans"
				/>
			</div>
			<div className="container mx-auto px-4 sm:px-8 lg:px-16 flex justify-end">
				<button
					type="button"
					aria-pressed={paused}
					onClick={() => setPaused((value) => !value)}
					className="py-3 text-sm font-bold underline decoration-2 underline-offset-4 hover:decoration-4 active:translate-y-px"
				>
					{paused ? "Start the band" : "Stop the band"}
				</button>
			</div>
		</div>
	);
}
