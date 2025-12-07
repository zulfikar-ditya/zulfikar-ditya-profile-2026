import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const siteUrl = "https://zulfikarditya.com"; // Update with your actual domain
const siteName = "Zulfikar Ditya";
const siteDescription =
	"Full Stack Developer specializing in React, Next.js, and modern web technologies. Building scalable and performant web applications with exceptional user experiences.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: `${siteName} - Full Stack Developer`,
		template: `%s | ${siteName}`,
	},
	description: siteDescription,
	keywords: [
		"Zulfikar Ditya",
		"Full Stack Developer",
		"React Developer",
		"Next.js Developer",
		"Web Developer",
		"JavaScript",
		"TypeScript",
		"Frontend Developer",
		"Backend Developer",
		"Software Engineer",
		"Portfolio",
	],
	authors: [{ name: "Zulfikar Ditya", url: siteUrl }],
	creator: "Zulfikar Ditya",
	publisher: "Zulfikar Ditya",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		siteName: siteName,
		title: `${siteName} - Full Stack Developer`,
		description: siteDescription,
		images: [
			{
				url: `${siteUrl}/og-image.png`, // Add your OG image
				width: 1200,
				height: 630,
				alt: `${siteName} - Full Stack Developer`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${siteName} - Full Stack Developer`,
		description: siteDescription,
		creator: "@zulfikar_ditya", // Update with your Twitter handle if available
		images: [`${siteUrl}/og-image.png`],
	},
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/icon.svg", type: "image/svg+xml" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	manifest: "/site.webmanifest",
	alternates: {
		canonical: siteUrl,
	},
	verification: {
		google: "your-google-verification-code", // Add your Google Search Console verification
		// yandex: "your-yandex-verification-code",
		// bing: "your-bing-verification-code",
	},
	category: "technology",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Zulfikar Ditya",
		url: siteUrl,
		image: `${siteUrl}/profile.jpg`,
		jobTitle: "Full Stack Developer",
		email: "zulfikarditya.work@gmail.com",
		sameAs: [
			"https://www.linkedin.com/in/zulfikar-ditya",
			"https://github.com/zulfikar-ditya",
			"https://www.instagram.com/zulfikar.ditya",
			"https://medium.com/@zulfikarditya",
		],
		knowsAbout: [
			"Web Development",
			"React",
			"Next.js",
			"JavaScript",
			"TypeScript",
			"Full Stack Development",
		],
	};

	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
