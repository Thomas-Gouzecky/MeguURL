import { Dispatch, SetStateAction, useEffect, useState, useSyncExternalStore } from "react";
import DisplayQRCodeIcon from "./QRCodeIcon";
import { motion } from "motion/react";
import useQrCode from "@/hooks/useQrCode";

export default function DisplayQRCodeCreator({ code }: { code: string | undefined }) {
	const [hover, setHover] = useState(false);
	const { body, create } = useQrCode();
	const baseURL = useSyncExternalStore(
		() => () => {},
		() => window.location.host,
		() => "",
	);

	useEffect(() => {
		console.log("Body:", body);
	}, [body]);

	if (!code) {
		return null;
	}

	async function handleClick() {
		const url = `${baseURL}/${code}`;
		await create({ data: url });
	}

	return (
		<motion.button
			className="font-bold flex items-center justify-center gap-2 text-lg w-fit button-padding h-15"
			onClick={handleClick}
			initial={{ scale: 1 }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 1 }}
			transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
		>
			{QuickQRButtonContents(setHover, hover)}
		</motion.button>
	);
}
function QuickQRButtonContents(setHover: Dispatch<SetStateAction<boolean>>, hover: boolean) {
	return (
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
				Generate QR Code
			</div>
		</motion.div>
	);
}
