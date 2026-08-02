import Link from "next/link";

export default function NavItem({ NavItem }: { NavItem: NavItemProp }) {
	return (
		<Link
			href={NavItem.href}
			className="border-transparent border-3 py-1.5 px-3 text-2xl text-shadow-md font-bold rounded-xl transition-all duration-300 hover:bg-[#260707] hover:inset-shadow-2xs hover:border-[#5E3131] hover:-translate-y-1.5 hover:shadow-[0px_6px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
		>
			{NavItem.name}
		</Link>
	);
}
