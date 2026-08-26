import SocialLinkContainer from "./components/SocialLinks/SocialLinkContainer";
import ExtraInfoContainer from "./components/ExtraInfo/ExtraInfoContainer";
import { socialLinks } from "./components/SocialLinks/socialLinks";
import { extraInfoList } from "./components/ExtraInfo/extraInfo";
import FooterCard from "./components/FooterCard";
import Image from "next/image";

export default function SpacingFooter({ spacingType }: { spacingType?: "flex" | "grid" }) {
	const footerSpacings = {
		flex: FlexSpacingFooter(),
		grid: GridSpacingFooter(),
	};

	return footerSpacings[spacingType ?? "flex"];
}

function FlexSpacingFooter() {
	const ExtraInfo = (
		<div className="w-full">
			<div className="">
				<FooterCard
					className="w-full h-full relative"
					FooterProps={{ title: "Extra Info" }}
				>
					<ExtraInfoContainer ExtraInfoList={extraInfoList} />
				</FooterCard>
			</div>
		</div>
	);
	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="grid grid-cols-4 gap-4 lg:flex lg:flex-row lg:w-full">
				{/* Literally Me :3*/}
				<div className="col-span-2">
					<FooterCard
						className="flex justify-center h-fit w-full md:h-full"
						FooterProps={{ title: "Literally Me :3" }}
					>
						<Image
							src="/literally-me.jpg"
							className="w-full max-w-full h-full rounded-lg object-cover"
							alt="Literally me as a sleepy cat ^_^"
							width={150}
							height={100}
						/>
					</FooterCard>
				</div>

				{/* QR Code Section */}
				<div className="col-span-2">
					<FooterCard
						className="flex justify-center h-fit w-full md:h-full"
						FooterProps={{ title: "Literally Me :3" }}
					>
						<Image
							src="/literally-me.jpg"
							className="w-full max-w-full h-full rounded-lg object-cover"
							alt="Literally me as a sleepy cat ^_^"
							width={150}
							height={100}
						/>
					</FooterCard>
				</div>

				<div className="flex flex-wrap flex-row gap-4 col-span-4 lg:flex-4">
					{/* Anime Countdown Section */}
					<div className="flex-3 lg:flex-1">
						<FooterCard className="w-full h-full">
							<div className="w-36" />
						</FooterCard>
					</div>

					{/* Links */}
					<div className="flex-1 md:flex-0">
						<FooterCard
							className="w-full h-full"
							FooterProps={{ title: "Links!" }}
						>
							<div className="m-auto h-full">
								<SocialLinkContainer SocialLinks={socialLinks} />
							</div>
						</FooterCard>
					</div>
				</div>
			</div>
			{ExtraInfo}
		</div>
	);
}

function GridSpacingFooter() {
	return (
		<div
			className="m-auto gap-4 grid 
			grid-rows-3 grid-cols-4"
		>
			<div
				className="m-auto 
				row-start-1 col-start-1 col-span-2"
			>
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
			<div
				className="
				row-start-1 col-start-3 col-span-2"
			>
				<FooterCard className="w-full h-full" />
			</div>
			<div
				className="m-auto flex justify-center
				row-start-2 col-start-4"
			>
				<FooterCard
					className="w-full"
					FooterProps={{ title: "Links!" }}
				>
					<div className="m-auto">
						<SocialLinkContainer SocialLinks={socialLinks} />
					</div>
				</FooterCard>
			</div>
			<div
				className="
				row-start-2 col-span-3"
			>
				<FooterCard className="w-full h-full" />
			</div>
			<div
				className="
				row-start-3 col-span-4"
			>
				<FooterCard
					className="w-full h-full relative"
					FooterProps={{ title: "Extra Info" }}
				>
					<ExtraInfoContainer ExtraInfoList={extraInfoList} />
				</FooterCard>
			</div>
		</div>
	);
}
