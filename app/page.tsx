import LightPillar from "@/components/react-bits/LightPillar/LightPillar";
import SplitText from "@/components/react-bits/SplitText/SplitText";
import TextType from "@/components/react-bits/TextType/TextType";
import AboutSection from "@/components/AboutSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
	return (
		<main>
			<SocialLinks />
			<section id="hero-section" className="h-screen relative overflow-hidden">
				{/* <LightPillar
					topColor="#00bba7"
					bottomColor="#e12afb"
					intensity={0.4}
					rotationSpeed={0.5}
					pillarWidth={5}
					pillarRotation={25}
				/> */}

				<LightPillar
					topColor="#5227FF"
					bottomColor="#FF9FFC"
					intensity={1.0}
					rotationSpeed={0.4}
					glowAmount={0.005}
					pillarWidth={3.0}
					pillarHeight={0.4}
					noiseIntensity={0.5}
					pillarRotation={45}
					interactive={false}
				/>

				<div className="container mx-auto px-4 min-h-screen">
					<div className="flex pt-10 items-center justify-center h-screen flex-col">
						<div className="text-center">
							<h1 className="text-4xl md:text-8xl font-bold">
								<SplitText
									text="Zulfikar Ditya Antariksa."
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
							<h2 className="mt-8 text-md md:text-2xl font-bold">
								<TextType
									text={[
										"Backend Engineer | API Architecture | High-Performance Systems",
									]}
									typingSpeed={40}
									pauseDuration={1500}
									showCursor={true}
									cursorCharacter="|"
								/>
							</h2>

							<a
								href="#about-me"
								className="mt-12 px-6 py-3 bg-white rounded-full text-black font-semibold hover:bg-gray-200 inline-flex items-center gap-2 animate-bounce"
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
		</main>
	);
}
