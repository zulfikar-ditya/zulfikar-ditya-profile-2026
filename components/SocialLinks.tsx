"use client";

import { useState } from "react";

export default function SocialLinks() {
	const [isOpen, setIsOpen] = useState(false);

	const socialLinks = [
		{
			name: "Email",
			url: "mailto:zulfikarditya.work@gmail.com",
			icon: (
				<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z M3 7l9 6l9 -6" />
			),
		},
		{
			name: "LinkedIn",
			url: "https://www.linkedin.com/in/zulfikar-ditya",
			icon: (
				<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z M8 11l0 5 M8 8l0 .01 M12 16l0 -5 M16 16v-3a2 2 0 0 0 -4 0" />
			),
		},
		{
			name: "GitHub",
			url: "https://github.com/zulfikar-ditya",
			icon: (
				<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
			),
		},
		{
			name: "Instagram",
			url: "https://www.instagram.com/zulfikar.ditya",
			icon: (
				<path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M16.5 7.5l0 .01" />
			),
		},
		{
			name: "Medium",
			url: "https://medium.com/@zulfikarditya",
			icon: (
				<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z M8 9h1l3 3l3 -3h1 M8 15l2 0 M14 15l2 0 M9 9l0 6 M15 9l0 6" />
			),
		},
		{
			name: "Resume",
			url: "https://drive.google.com/file/d/1Pm8aTf-cGHiZzhF75jzPdmMXWO8thVqa/view?usp=sharing",
			icon: (
				<path d="M14 3v4a1 1 0 0 0 1 1h4 M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z M9 17h6 M9 13h6" />
			),
		},
	];

	return (
		<div className="fixed bottom-8 right-8 z-50">
			<div className="flex flex-col-reverse items-start gap-3">
				{isOpen && (
					<div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
						{socialLinks.map((link) => (
							<a
								key={link.name}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-3 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors shadow-lg"
								title={link.name}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									{link.icon}
								</svg>
								<span className="font-medium">{link.name}</span>
							</a>
						))}
					</div>
				)}

				<button
					onClick={() => setIsOpen(!isOpen)}
					className="px-4 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors shadow-lg flex items-center gap-2"
					aria-label="Toggle social links"
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
						className={`transition-transform ${isOpen ? "rotate-45" : ""}`}
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 5l0 14 M5 12l14 0" />
					</svg>
					<span className="font-semibold">Connect</span>
				</button>
			</div>
		</div>
	);
}
