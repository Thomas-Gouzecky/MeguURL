import LiterallyMe from "./components/LiterallyMeCard";
import SocialLinkContainer from "./components/SocialLinkContainer";
import { socialLinks } from "./components/socialLinks";

export default function Footer() {
	return (
		<div className="m-5 p-3 rounded-xl bg-linear-to-tl from-[#261A18] to-[#170f0b]">
			<LiterallyMe />
			<SocialLinkContainer SocialLinks={socialLinks} />
		</div>
	);
}
