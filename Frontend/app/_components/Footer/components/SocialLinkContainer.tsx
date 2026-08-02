import SocialLinkCard from "./SocialLinkCard";

export default function SocialLinkContainer({ SocialLinks }: { SocialLinks: SocialLinkProp[] }) {
	return (
		<div className="grid grid-cols-3 gap-4 rounded-xl">
			{SocialLinks.map((item, i) => (
				<SocialLinkCard
					key={i}
					SocialLinkInfo={item}
				/>
			))}
		</div>
	);
}
