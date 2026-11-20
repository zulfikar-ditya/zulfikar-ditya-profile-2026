import { skillGroups, type SkillGroup } from "@/content/skills";
import { cn } from "@/lib/utils";
import Heading from "./Heading";

const mark: Record<SkillGroup["line"], string> = {
	ai: "bg-green",
	backend: "bg-marigold",
	support: "bg-paper",
};

/** How many tools a group names before the rest goes behind "and N more". */
const SHOWN = 6;

export default function Tools() {
	return (
		<section id="tools" aria-label="The tools I use" className="bg-ink text-paper py-24 md:py-36">
			<div className="container mx-auto px-4 sm:px-8 lg:px-16">
				<Heading text="The tools I use" effect="fold" />
				<p className="text-xl md:text-2xl mt-6 max-w-2xl leading-relaxed">
					You don&apos;t need to know these names. They&apos;re here for the people
					who do, grouped by what each set is for.
				</p>

				<ul className="mt-14 border-t border-asphalt">
					{skillGroups.map((group) => {
						const first = group.skills.slice(0, SHOWN);
						const rest = group.skills.slice(SHOWN);

						return (
							<li
								key={group.id}
								className="grid md:grid-cols-[16rem_1fr] gap-x-10 gap-y-3 py-8 border-b border-asphalt"
							>
								<h3 className="flex items-baseline gap-3 text-2xl font-extrabold">
									<span aria-hidden="true" className={cn("size-3 shrink-0", mark[group.line])} />
									{group.label}
								</h3>
								<div className="max-w-3xl">
									<p className="text-lg md:text-xl leading-snug">{group.plain}</p>
									<p className="mt-3 text-steel font-semibold leading-relaxed">
										{first.join(", ")}
										{rest.length === 0 && "."}
									</p>
									{rest.length > 0 && (
										<details className="group mt-1">
											<summary className="inline-block py-2 font-bold underline decoration-2 underline-offset-4 hover:decoration-4 list-none [&::-webkit-details-marker]:hidden">
												<span className="group-open:hidden">and {rest.length} more</span>
												<span className="hidden group-open:inline">show fewer</span>
											</summary>
											<p className="text-steel font-semibold leading-relaxed">
												{rest.join(", ")}.
											</p>
										</details>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
