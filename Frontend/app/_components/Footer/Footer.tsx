import SocialLinkContainer from "./components/SocialLinks/SocialLinkContainer";
import ExtraInfoContainer from "./components/ExtraInfo/ExtraInfoContainer";
import { socialLinks } from "./components/SocialLinks/socialLinks";
import { extraInfoList } from "./components/ExtraInfo/extraInfo";
import FooterCard from "./components/FooterCard";
import Image from "next/image";

export default function Footer() {
	return (
		<div className="flex items-center justify-center m-5 p-4 rounded-xl bg-linear-to-tl from-[#261A18] to-[#170f0b]">
			<div className="m-auto grid grid-cols-3 grid-rows-3 gap-4 max-w-7xl">
				<div className="row-span-2 row-start-1">
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
				<div className="">
					<FooterCard className="w-full" />
				</div>
				<div className="flex justify-center">
					<FooterCard
						className=""
						FooterProps={{ title: "Links!" }}
					>
						<SocialLinkContainer SocialLinks={socialLinks} />
					</FooterCard>
				</div>
				<div className="col-span-2">
					<FooterCard />
				</div>
				<div className="col-span-3 row-start-3">
					<FooterCard
						className="w-full h-full"
						FooterProps={{ title: "Extra Info" }}
					>
						<ExtraInfoContainer ExtraInfoList={extraInfoList} />
					</FooterCard>
				</div>
			</div>
		</div>
	);
}
