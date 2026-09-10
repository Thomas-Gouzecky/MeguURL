import { IoQrCodeOutline } from "react-icons/io5";
import { IoMdQrScanner } from "react-icons/io";
import { AnimatePresence, motion } from "motion/react";

export default function DisplayQRCodeIcon({ hover }: { hover: boolean }) {
	const icon = getCurrentIcon(hover);
	return (
		<AnimatePresence mode="popLayout">
			<motion.div
				key={`${hover ? "hover" : "default"}`}
				className="flex origin-center items-center justify-center flex-col gap-1"
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
			>
				<motion.div
					className="p-1.5"
					initial={{ scale: 1 }}
					animate={{ scale: 1 }}
					whileHover={{ scale: 1.1 }}
					transition={{ duration: 0.2 }}
				>
					{icon}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}

function getCurrentIcon(hover: boolean) {
	return hover ? <IoQrCodeOutline size={20} /> : <IoMdQrScanner size={20} />;
}
