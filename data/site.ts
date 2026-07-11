export type Social = { name: string; url: string; label: string };
export type Stat = { value: string; label: string };
export type NavItem = { href: string; label: string };

export const site = {
	name: "Zulfikar Ditya",
	role: "Backend Engineer",
	tagline: "Laravel · Go · Node.js",
	valueProp:
		"I build scalable APIs and high-performance backend systems — clean architecture, tuned databases, and CI/CD that ships reliably.",
	location: "Indonesia · Remote",
	email: "zulfikarditya.work@gmail.com",
	url: "https://zulfikarditya.com",
	resumeUrl:
		"https://drive.google.com/file/d/11Ix693nenmXZ-JMHmwNSI4XwxAgnnfwv/view?usp=sharing",
	resumePdf: "/resume.pdf", // user drops file here; UI falls back to resumeUrl if 404
	mediumUsername: "zulfikarditya",
	socials: [
		{ name: "Email", url: "mailto:zulfikarditya.work@gmail.com", label: "zulfikarditya.work@gmail.com" },
		{ name: "GitHub", url: "https://github.com/zulfikar-ditya", label: "@zulfikar-ditya" },
		{ name: "LinkedIn", url: "https://www.linkedin.com/in/zulfikar-ditya", label: "in/zulfikar-ditya" },
		{ name: "Medium", url: "https://medium.com/@zulfikarditya", label: "@zulfikarditya" },
		{ name: "Instagram", url: "https://www.instagram.com/zulfikar.ditya", label: "@zulfikar.ditya" },
	] satisfies Social[],
	stats: [
		{ value: "5+", label: "Years experience" },
		{ value: "10", label: "Roles delivered" },
		{ value: "8", label: "Open-source repos" },
	] satisfies Stat[],
	nav: [
		{ href: "/work", label: "Work" },
		{ href: "/projects", label: "Projects" },
		{ href: "/articles", label: "Articles" },
		{ href: "/contact", label: "Contact" },
	] satisfies NavItem[],
};
