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

	if (!code) {
		return null;
	}

	return (
		<motion.button
			className="font-bold flex items-center justify-center gap-2 text-lg w-fit button-padding h-15"
			initial={{ scale: 1 }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
		>
			<motion.div
				className="clickable-text-color bg-[#471414] border-transparent border-2 button-rounding transition-all duration-300 hover:bg-[#260707] hover:inset-shadow-2xs hover:border-[#5E3131]"
				onHoverStart={() => {
					setHover(true);
				}}
				onHoverEnd={() => {
					setHover(false);
				}}
			>
				<div className="flex items-center justify-center gap-2 text-lg w-fit button-padding rounded-xl">
					<div>
						<DisplayQRCodeIcon hover={hover} />
					</div>
					Generate into QR Code
				</div>
			</motion.div>
		</motion.button>
	);
}
