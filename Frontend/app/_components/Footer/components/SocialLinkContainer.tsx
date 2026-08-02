import SocialLinkCard from "./SocialLinkCard";

export default function SocialLinkContainer({ SocialLinks }: { SocialLinks: SocialLinkProp[] }) {
	return (
		<div>
			{SocialLinks.map((item, i) => (
				<SocialLinkCard
					key={i}
					SocialLinkInfo={item}
				/>
			))}
		</div>
	);
}
