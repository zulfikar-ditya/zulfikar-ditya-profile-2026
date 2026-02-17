import SplitText from "@/components/react-bits/SplitText/SplitText";
import TextType from "@/components/react-bits/TextType/TextType";
import AboutSection from "@/components/AboutSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import BlogSection from "@/components/BlogSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import SocialLinks from "@/components/SocialLinks";
import FloatingLines from "@/components/FloatingLines";

export default function Home() {
	return (
		<main>
			<SocialLinks />
			<section id="hero-section" className="h-screen relative overflow-hidden">
				<div className="absolute inset-0 z-[-99]">
					<FloatingLines
						enabledWaves={["top", "middle"]}
						lineCount={5}
						lineDistance={5}
						bendRadius={5}
						bendStrength={-0.5}
						interactive={true}
						parallax={true}
						animationSpeed={5}
					/>
				</div>

				<div className="container mx-auto px-4 min-h-screen">
					<div className="flex pt-10 items-center justify-center h-screen flex-col text-white">
						<div className="text-center">
							<h1 className="text-4xl md:text-8xl font-bold">
								<SplitText
									text="Zulfikar Ditya."
									className=""
									delay={100}
									duration={0.6}
									ease="power3.out"
									splitType="chars"
									from={{ opacity: 0, y: 40 }}
									to={{ opacity: 1, y: 0 }}
									threshold={0.1}
									rootMargin="-100px"
									textAlign="center"
								/>
							</h1>
							<h2 className="mt-8 text-md md:text-2xl font-bold text-white">
								<TextType
									text={[
										"Backend Engineer | Laravel, Go, Node.js | Scalable APIs & Performance Optimization",
									]}
									typingSpeed={40}
									pauseDuration={1500}
									showCursor={true}
									cursorCharacter="|"
								/>
							</h2>

							<a
								href="#about-me"
								aria-label="Scroll down to About Me section"
								className="mt-12 p-2 bg-white rounded-full text-black font-semibold hover:bg-gray-200 inline-flex items-center gap-2 animate-bounce"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-down-dashed"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M12 5v.5m0 3v1.5m0 3v6" />
									<path d="M18 13l-6 6" />
									<path d="M6 13l6 6" />
								</svg>
							</a>
						</div>
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
