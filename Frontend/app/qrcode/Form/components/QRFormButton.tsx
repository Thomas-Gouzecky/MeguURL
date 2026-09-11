import { motion } from "motion/react";

export default function QRFormButton({ isLoading }: { isLoading: boolean }) {
	const buttonVariants = {
		initial: { scale: 1 },
		hover: { scale: 1.05 },
		active: { scale: 0.98 },
	};
	return (
		<motion.button
			variants={buttonVariants}
			initial="initial"
			whileHover="hover"
			whileTap="active"
			type="submit"
			disabled={isLoading}
		>
			<div className="w-full h-fit bg-[#1f1414] border-2 border-[#402a2a] hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.25)] hover:border-[#6c3030] clickable-text-color button-padding button-rounding relative text-lg font-bold overflow-hidden transition-all duration-300">
				Generate QR Code
			</div>
		</motion.button>
	);
}
