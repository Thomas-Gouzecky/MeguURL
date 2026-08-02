import LiterallyMe from "./components/LiterallyMeCard";
import SocialLinkContainer from "./components/SocialLinkContainer";
import { socialLinks } from "./components/socialLinks";

export default function Footer() {
	return (
		<div className="m-5 p-3 rounded-xl bg-[#261A18]">
			<LiterallyMe />
			<SocialLinkContainer SocialLinks={socialLinks} />
		</div>
	);
}
