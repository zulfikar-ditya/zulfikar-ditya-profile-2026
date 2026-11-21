import { CountUp } from "@/components/react-bits";

/**
 * A number that counts up when it scrolls into view. The counter starts at 0
 * in the page's HTML, so the real value is always there too: screen readers
 * read it, and it replaces the counter when scripts are off (see the
 * `<noscript>` rule in app/layout.tsx).
 */
export default function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
	return (
		<>
			<span aria-hidden="true" className="js-only">
				<CountUp to={to} suffix={suffix} duration={1.2} />
			</span>
			<span className="no-js-only sr-only">
				{to}
				{suffix}
			</span>
		</>
	);
}
