import SocialLinkContainer from "./components/SocialLinkContainer";
import { socialLinks } from "./components/socialLinks";
import FooterCard from "./components/FooterCard";
import Image from "next/image";

export default function Footer() {
	return (
		<div className="flex items-center justify-center m-5">
			<div className="m-auto grid grid-cols-6 grid-rows-4 gap-4 p-4 rounded-xl bg-linear-to-tl from-[#261A18] to-[#170f0b]">
				<div className="col-span-2 row-span-3">
					<FooterCard FooterProps={{ title: "Literally Me :3" }}>
						<Image
							src="/literally-me.jpg"
							className="rounded-lg"
							alt="Literally me as a sleepy cat ^_^"
							width={512}
							height={512}
						/>
					</FooterCard>
				</div>
				<div className="row-span-3 col-start-3">
					<FooterCard />
				</div>
				<div className="flex justify-end col-span-3 row-span-3 col-start-4">
					<FooterCard FooterProps={{ title: "Links!" }}>
						<SocialLinkContainer SocialLinks={socialLinks} />
					</FooterCard>
				</div>
				<div className="col-span-6 row-start-4">
					<FooterCard />
				</div>
			</div>
		</div>
	);
}
