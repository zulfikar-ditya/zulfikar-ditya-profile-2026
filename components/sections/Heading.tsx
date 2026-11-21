import { FoldText, SplitFlapText, SplitText } from "@/components/react-bits";
import { cn } from "@/lib/utils";

const size = "font-display text-5xl sm:text-6xl lg:text-7xl max-w-4xl";

/**
 * A section heading. Each section opens its own way, so the page doesn't
 * repeat one move: words rising, letters flipping, paper unfolding, or a
 * station board flapping into place.
 */
export default function Heading({
	text,
	effect = "rise",
	className,
}: {
	text: string;
	effect?: "rise" | "flip" | "fold" | "fold-side" | "board";
	className?: string;
}) {
	if (effect === "board") {
		return (
			<h2 className={className}>
				<span className="js-only">
					<SplitFlapText
						text={text.toUpperCase()}
						padTo={text.length}
						loop={false}
						flipDuration={0.09}
						stagger={0.035}
						flipsPerChar={5}
						tileColor="var(--color-ink)"
						textColor="var(--color-paper)"
						tileRadius={0}
						depth={0}
						gap={2}
						fontSize="clamp(1.5rem, 6.2vw, 4rem)"
					/>
				</span>
				<span className={cn("no-js-only sr-only", size)}>{text}</span>
			</h2>
		);
	}

	if (effect === "fold" || effect === "fold-side") {
		return (
			<h2 className={cn(size, className)}>
				<FoldText
					text={text}
					splitBy="word"
					hinge={effect === "fold" ? "top" : "left"}
					trigger="scroll"
					fontSize="1em"
					fontWeight={900}
					duration={0.6}
					stagger={0.08}
					className="tracking-[-0.02em]! leading-none!"
				/>
			</h2>
		);
	}

	return (
		<SplitText
			tag="h2"
			text={text}
			splitType={effect === "flip" ? "chars" : "words"}
			effect={effect}
			mask={effect === "rise"}
			delay={effect === "flip" ? 22 : 45}
			duration={0.7}
			textAlign="left"
			rootMargin="-80px"
			className={cn("split-heading", size, className)}
		/>
	);
}
