import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export function GET() {
	const body = `# ${site.name}\n\n> ${site.role} — ${site.valueProp}\n\n## Contact\n${site.socials.map(s => `- ${s.name}: ${s.url}`).join("\n")}\n\n## Experience\n${experience.slice(0,6).map(e => `- ${e.title} @ ${e.company} (${e.dateStart}–${e.dateEnd})`).join("\n")}\n\n## Open source\n${projects.flatMap(g => g.repos.map(r => `- ${r.name}: ${r.description} — ${r.url}`)).join("\n")}\n`;
	return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
