import { motion } from "motion/react";

export default function QRCodeImage({
	QRCode,
	Size,
}: {
	QRCode: React.ReactNode;
	Size: QRCodeSize;
}): React.JSX.Element {
	let className = "shrink-0 overflow-visible m-auto";
	switch (Size) {
		case "small":
			className += " w-32 h-32";
			break;
		case "medium":
			className += " w-64 h-64";
			break;
		case "large":
			className += " w-96 h-96";
			break;
	}
	const animationVariants = {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
	};
	return (
		<motion.div
			variants={animationVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={className + " transition-all duration-300"}
		>
			<div className="overflow-hidden rounded-lg">{QRCode}</div>
		</motion.div>
	);
}
