import SocialLinkCard from "./SocialLinkCard";

export default function SocialLinkContainer({ SocialLinks }: { SocialLinks: SocialLinkProp[] }) {
	return (
		<div
			className="h-full flex flex-wrap gap-4 rounded-xl
			md:flex-col md:justify-around"
		>
			{SocialLinks.map((item, i) => (
				<SocialLinkCard
					key={i}
					SocialLinkInfo={item}
				/>
			))}
		</div>
	);
}
