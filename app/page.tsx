import SplitText from "@/components/react-bits/SplitText/SplitText";
import TextType from "@/components/react-bits/TextType/TextType";
import AboutSection from "@/components/AboutSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import BlogSection from "@/components/BlogSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import SocialLinks from "@/components/SocialLinks";
import FloatingLines from "@/components/FloatingLines";
import HeroProfileCard from "@/components/HeroProfileCard";

export default function Home() {
	return (
		<main>
			<SocialLinks />
			<section
				id="hero-section"
				className="h-screen relative overflow-hidden bg-p-base"
			>
				{/* Animated background */}
				<div className="absolute inset-0 z-[-99]">
					<FloatingLines
						linesGradient={["#c4ff00", "#00cc66"]}
						enabledWaves={["top", "middle"]}
						lineCount={4}
						lineDistance={6}
						bendRadius={4}
						bendStrength={-0.5}
						interactive={true}
						parallax={true}
						animationSpeed={4}
					/>
				</div>

				<div className="container mx-auto px-8 lg:px-16 min-h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
					{/* Left: text content */}
					<div className="flex-1 flex flex-col justify-center pt-16 lg:pt-0">
						{/* Technical section label */}
						<p className="font-jetbrains text-xs tracking-[0.25em] text-p-accent uppercase mb-8 opacity-90">
							// 000 — portfolio
						</p>

						{/* Name */}
						<h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[7rem] font-bold leading-[0.92] text-p-ink mb-8">
							<SplitText
								text="Zulfikar Ditya."
								tag="span"
								className="font-display font-bold"
								delay={70}
								duration={0.7}
								ease="power4.out"
								splitType="chars"
								from={{ opacity: 0, y: 60 }}
								to={{ opacity: 1, y: 0 }}
								threshold={0.1}
								rootMargin="-80px"
								textAlign="left"
							/>
						</h1>

						{/* Role — terminal prompt style */}
						<div className="flex items-center gap-3 mb-14">
							<span className="font-jetbrains text-p-accent text-lg select-none leading-none">
								›
							</span>
							<h2 className="font-jetbrains text-sm md:text-base text-p-muted">
								<TextType
									text={[
										"Backend Engineer — Laravel, Go, Node.js — Scalable APIs & Performance Optimization",
									]}
									typingSpeed={32}
									pauseDuration={2500}
									showCursor={true}
									cursorCharacter="▊"
								/>
							</h2>
						</div>

						{/* Scroll CTA */}
						<div className="flex items-center gap-4">
							<div className="w-8 h-px bg-p-accent" />
							<a
								href="#about-me"
								aria-label="Scroll to About Me"
								className="font-jetbrains text-xs tracking-[0.25em] text-p-muted hover:text-p-accent transition-colors duration-200 uppercase"
							>
								scroll
							</a>
						</div>
					</div>

					{/* Right: ProfileCard — desktop only */}
					<div className="hidden lg:flex items-center justify-center shrink-0 py-12">
						<HeroProfileCard />
					</div>
				</div>
			</section>

			<AboutSection />
			<WorkExperienceSection />
			<OpenSourceSection />
			<BlogSection />
		</main>
	);
}
