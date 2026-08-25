import Link from "next/link";

export default function SocialLinkCard({ SocialLinkInfo }: { SocialLinkInfo: SocialLinkProp }) {
	return (
		<Link
			className="relative grow md:grow! bg-[#471414] clickable-text-color overflow-hidden flex justify-center md:justify-start max-w-sm max-h-12 border-transparent border-2 button-padding button-rounding transition-all duration-300 hover:bg-[#260707] hover:inset-shadow-2xs hover:border-[#5E3131] hover:-translate-y-1 hover:shadow-[0px_6px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
			href={SocialLinkInfo.href}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className="flex items-center justify-center gap-2 text-shadow-md">
				{SocialLinkInfo.icon}
				<span className="relative text-lg font-bold hidden md:inline">{SocialLinkInfo.name}</span>
			</div>
		</Link>
	);
}
