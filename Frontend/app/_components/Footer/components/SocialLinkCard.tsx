import Link from "next/link";

export default function SocialLinkCard({ SocialLinkInfo }: { SocialLinkInfo: SocialLinkProp }) {
	return (
		<Link href={SocialLinkInfo.href}>
			<div className="w-16">{SocialLinkInfo.icon}</div>
			<p>{SocialLinkInfo.name}</p>
		</Link>
	);
}
