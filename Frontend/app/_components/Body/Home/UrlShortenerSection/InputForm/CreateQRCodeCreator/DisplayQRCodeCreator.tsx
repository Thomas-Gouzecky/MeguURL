import { useState, useSyncExternalStore } from "react";
import DisplayQRCodeIcon from "./QRCodeIcon";
import { motion } from "motion/react";

export default function DisplayQRCodeCreator({ code }: { code: string | undefined }) {
	const [hover, setHover] = useState(false);
	const baseURL = useSyncExternalStore(
		() => () => {},
		() => window.location.host,
		() => "",
	);

	return (
		<div>
			{code && (
				<motion.div
					className="h-15 w-full flex justify-center items-center"
					onHoverStart={() => {
						setHover(true);
					}}
					onHoverEnd={() => {
						setHover(false);
					}}
				>
					<div className="clickable-text-color bg-[#471414] flex border-transparent border-2 button-rounding transition-all duration-300 hover:bg-[#260707] hover:inset-shadow-2xs hover:border-[#5E3131]">
						<DisplayQRCodeIcon hover={hover} />
					</div>
					Generate into QR Code
				</motion.div>
			)}
		</div>
	);
}
