import Link from "next/link";

export default function SocialLinkCard({ SocialLinkInfo }: { SocialLinkInfo: SocialLinkProp }) {
	return (
		<Link
			className="bg-[#471414] text-[#CCB14E] overflow-hidden flex max-w-sm max-h-12 border-transparent border-2 py-1.25 px-2.75 rounded-lg transition-all duration-300 hover:bg-[#260707] hover:inset-shadow-2xs hover:border-[#5E3131] hover:-translate-y-1 hover:shadow-[0px_6px_0px_rgba(0,0,0,0.2)] hover:text-[#FADA64] active:translate-y-0.5 active:shadow-none"
			href={SocialLinkInfo.href}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className="flex items-center gap-2 text-shadow-md">
				{SocialLinkInfo.icon}
				<span className="relative text-lg font-bold">{SocialLinkInfo.name}</span>
			</div>
		</Link>
	);
}
