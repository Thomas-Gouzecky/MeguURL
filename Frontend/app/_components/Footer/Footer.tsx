import SocialLinkContainer from "./components/SocialLinkContainer";
import { socialLinks } from "./components/socialLinks";
import FooterCard from "./components/FooterCard";
import Image from "next/image";

export default function Footer() {
	return (
		<div className="grid grid-cols-[1fr_2fr] m-5 p-4 rounded-xl bg-linear-to-tl from-[#261A18] to-[#170f0b]">
			<FooterCard FooterProps={{ title: "Literally Me :3" }}>
				<Image
					src="/literally-me.jpg"
					className="rounded-lg"
					alt="Literally me as a sleepy cat ^_^"
					width={512}
					height={512}
				/>
			</FooterCard>
			<div className="flex justify-end">
				<FooterCard FooterProps={{ title: "Links!" }}>
					<SocialLinkContainer SocialLinks={socialLinks} />
				</FooterCard>
			</div>
		</div>
	);
}
