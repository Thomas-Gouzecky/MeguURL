import { AnimatePresence, motion } from "motion/react";
import getStatusIconObject from "./helper/QRGetStatusIconObjectHelper";
import QRFormStatusMessage from "./QRFormStatusMessage";
import { useState } from "react";

export default function QRFormStatusIconObject({
	status,
	isLoading,
	body,
	error,
}: {
	status: number | null;
	isLoading: boolean;
	body: QrCodeAPIResponse | null;
	error: HTTPValidationError | null;
}) {
	const [messageVisible, setMessageVisible] = useState<boolean>(false);
	const iconObject: QRFormStatusIconObject = getStatusIconObject({ status, isLoading, body, error });
	const HoverIconButton = (iconObject: QRFormStatusIconObject) => {
		return (
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={(e) => {
					e.preventDefault();
					setMessageVisible(!messageVisible);
				}}
				transition={{
					type: "spring",
					stiffness: 400,
					damping: 20,
				}}
			>
				{iconObject.icon}
			</motion.button>
		);
	};

	return (
		<div className="flex size-full items-center justify-start">
			<div className="relative flex items-center justify-center">
				<AnimatePresence mode="popLayout">
					<motion.div
						key={`${status}-${isLoading}`}
						className="flex size-10 origin-center items-center justify-center"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
					>
						{HoverIconButton(iconObject)}
					</motion.div>
				</AnimatePresence>
				<motion.div
					className="absolute bottom-full left-0 mb-2 w-max"
					animate={messageVisible ? { opacity: 1 } : { opacity: 0 }}
				>
					<QRFormStatusMessage message={iconObject.message} />
				</motion.div>
			</div>
		</div>
	);
}
