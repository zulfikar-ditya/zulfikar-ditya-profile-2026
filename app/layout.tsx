import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const syne = Syne({
	variable: "--font-syne",
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	weight: ["400", "500"],
});

const siteUrl = "https://zulfikarditya.com";
const siteName = "Zulfikar Ditya";
const siteDescription =
	"Backend Engineer with 5+ years of experience building scalable APIs and high-performance systems using Laravel, Go, and Node.js. Proven track record in clean architecture, database optimization, and CI/CD pipelines.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: `${siteName} - Backend Engineer | Laravel, Go, Node.js`,
		template: `%s | ${siteName}`,
	},
	description: siteDescription,
	keywords: [
		"Zulfikar Ditya",
		"Backend Engineer",
		"Backend Developer",
		"Laravel Developer",
		"Go Developer",
		"Node.js Developer",
		"NestJS",
		"REST API",
		"API Design",
		"PostgreSQL",
		"TypeScript",
		"Software Engineer",
		"Clean Architecture",
		"Database Optimization",
		"DevOps",
		"Docker",
		"CI/CD",
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
		title: `${siteName} - Backend Engineer | Laravel, Go, Node.js`,
		description: siteDescription,
		images: [
			{
				url: `${siteUrl}/og-image.png`, // Add your OG image
				width: 1200,
				height: 630,
				alt: `${siteName} - Backend Engineer`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${siteName} - Backend Engineer | Laravel, Go, Node.js`,
		description: siteDescription,
		creator: "@zulfikar_ditya",
		images: [
			{
				url: `${siteUrl}/og-image.png`,
				width: 1200,
				height: 630,
				alt: `${siteName} - Backend Engineer`,
			},
		],
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
		// google: "your-google-verification-code",
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
	const personJsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Zulfikar Ditya",
		url: siteUrl,
		image: `${siteUrl}/og-image.png`,
		jobTitle: "Backend Engineer",
		email: "zulfikarditya.work@gmail.com",
		description: siteDescription,
		sameAs: [
			"https://www.linkedin.com/in/zulfikar-ditya",
			"https://github.com/zulfikar-ditya",
			"https://www.instagram.com/zulfikar.ditya",
			"https://medium.com/@zulfikarditya",
		],
		knowsAbout: [
			"Backend Development",
			"Laravel",
			"Go",
			"Node.js",
			"NestJS",
			"REST API Design",
			"PostgreSQL",
			"MySQL",
			"Redis",
			"Docker",
			"CI/CD",
			"Clean Architecture",
			"TypeScript",
			"Database Optimization",
		],
		worksFor: {
			"@type": "Organization",
			name: "SUPERFUTUREKOMPANY",
		},
	};

	const websiteJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteName,
		url: siteUrl,
		description: siteDescription,
		author: {
			"@type": "Person",
			name: "Zulfikar Ditya",
		},
	};

	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(personJsonLd),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(websiteJsonLd),
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
