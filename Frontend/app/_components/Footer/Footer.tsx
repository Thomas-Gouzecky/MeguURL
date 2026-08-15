import SocialLinkContainer from "./components/SocialLinks/SocialLinkContainer";
import ExtraInfoContainer from "./components/ExtraInfo/ExtraInfoContainer";
import { socialLinks } from "./components/SocialLinks/socialLinks";
import { extraInfoList } from "./components/ExtraInfo/extraInfo";
import FooterCard from "./components/FooterCard";
import Image from "next/image";

export default function Footer() {
	return (
		<div className="h-fit flex items-center justify-center m-5 p-4 rounded-xl bg-linear-to-tl from-[#261A18] to-[#170f0b]">
			<div className="m-auto grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3 gap-4 max-w-7xl">
				<div className="m-auto sm:row-span-2 lg:row-span-2 lg:row-start-1">
					<FooterCard
						className=""
						FooterProps={{ title: "Literally Me :3" }}
					>
						<Image
							src="/literally-me.jpg"
							className="rounded-lg"
							alt="Literally me as a sleepy cat ^_^"
							width={512}
							height={100}
						/>
					</FooterCard>
				</div>
				<div className="">
					<FooterCard className="w-full h-full" />
				</div>
				<div className="m-auto flex justify-center row-start-2 sm:row-start-1 sm:col-start-2 lg:col-start-3">
					<FooterCard
						className="w-full"
						FooterProps={{ title: "Links!" }}
					>
						<div className="m-auto">
							<SocialLinkContainer SocialLinks={socialLinks} />
						</div>
					</FooterCard>
				</div>
				<div className="sm:col-span-2 lg:col-span-2">
					<FooterCard className="w-full h-full" />
				</div>
				<div className="sm:col-span-2 sm:row-start-4 lg:col-span-3 lg:row-start-3">
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
