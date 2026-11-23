import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"],
});

const siteUrl = "https://zulfikarditya.com";
const siteName = "Zulfikar Ditya";
const siteTitle = `${siteName} - Backend & AI Engineer | Laravel, NestJS, RAG`;
const siteDescription =
	"Zulfikar Ditya Antariksa, Backend and AI Engineer in Jakarta with 5+ years building APIs, integrations and queue-based systems in Laravel and NestJS, now building RAG pipelines, embeddings and LLM guardrails on pgvector and Qdrant.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: siteTitle,
		template: `%s | ${siteName}`,
	},
	description: siteDescription,
	keywords: [
		// Name variants
		"Zulfikar Ditya",
		"Zulfikar Ditya Antariksa",
		"Zulfikar",
		"Ditya",
		"Antariksa",
		"Zulfikar Antariksa",
		"Ditya Antariksa",
		"zulfikar-ditya",
		"zulfikarditya",
		"Zulfikar Ditya Backend Engineer",
		"Zulfikar Ditya AI Engineer",
		"Zulfikar Ditya Laravel",
		"Zulfikar Ditya portfolio",
		"Zulfikar Ditya Antariksa Jakarta",
		"Zulfikar Ditya Indonesia",
		// Roles & stack
		"Backend Engineer",
		"Backend Developer",
		"AI Engineer",
		"Laravel Developer",
		"Node.js Developer",
		"NestJS",
		"Bun",
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
		// AI engineering
		"Retrieval Augmented Generation",
		"RAG",
		"Embeddings",
		"pgvector",
		"Qdrant",
		"Vector Database",
		"Prompt Engineering",
		"LLM Guardrails",
		"OpenAI",
		"Anthropic",
		"OpenRouter",
	],
	authors: [
		{ name: "Zulfikar Ditya Antariksa", url: siteUrl },
		{ name: "Zulfikar Ditya", url: siteUrl },
	],
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
		title: siteTitle,
		description: siteDescription,
		images: [
			{
				url: `${siteUrl}/og-image.png`, // Add your OG image
				width: 1200,
				height: 630,
				alt: `Zulfikar Ditya Antariksa - Backend & AI Engineer`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteTitle,
		description: siteDescription,
		creator: "@zulfikar_ditya",
		images: [
			{
				url: `${siteUrl}/og-image.png`,
				width: 1200,
				height: 630,
				alt: `Zulfikar Ditya Antariksa - Backend & AI Engineer`,
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
		name: "Zulfikar Ditya Antariksa",
		alternateName: [
			"Zulfikar Ditya",
			"Zulfikar",
			"Ditya Antariksa",
			"zulfikar-ditya",
		],
		givenName: "Zulfikar",
		additionalName: "Ditya",
		familyName: "Antariksa",
		url: siteUrl,
		image: `${siteUrl}/og-image.png`,
		jobTitle: "Backend Engineer & AI Engineer",
		email: "zulfikarditya.work@gmail.com",
		description: siteDescription,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Jakarta",
			addressCountry: "ID",
		},
		alumniOf: [
			{
				"@type": "CollegeOrUniversity",
				name: "Cakrawala University",
			},
			{
				"@type": "EducationalOrganization",
				name: "SMKN 1 Jenangan",
			},
		],
		sameAs: [
			"https://www.linkedin.com/in/zulfikar-ditya",
			"https://github.com/zulfikar-ditya",
			"https://www.instagram.com/zulfikar.ditya",
			"https://medium.com/@zulfikarditya",
		],
		knowsAbout: [
			"Backend Development",
			"AI Engineering",
			"Retrieval Augmented Generation",
			"Embeddings",
			"Vector Databases",
			"pgvector",
			"Qdrant",
			"Prompt Engineering",
			"LLM Guardrails",
			"Laravel",
			"Go",
			"Node.js",
			"Bun",
			"NestJS",
			"REST API Design",
			"PostgreSQL",
			"MySQL",
			"MongoDB",
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
		alternateName: ["Zulfikar Ditya Antariksa", "Zulfikar Ditya Portfolio"],
		author: {
			"@type": "Person",
			name: "Zulfikar Ditya Antariksa",
			alternateName: "Zulfikar Ditya",
		},
	};

	return (
		<html lang="en">
			<head>
				<noscript>
					<style>{`.split-heading{visibility:visible!important}.js-only{display:none}.no-js-only{position:static!important;width:auto!important;height:auto!important;margin:0!important;clip:auto!important;clip-path:none!important;white-space:normal!important}`}</style>
				</noscript>
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
				className={`${nunito.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
