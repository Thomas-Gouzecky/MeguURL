import { AnimatePresence, motion, Variants } from "motion/react";
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
				{MessageContainer(iconObject, messageVisible)}
			</div>
		</div>
	);
}
function MessageContainer(iconObject: QRFormStatusIconObject, messageVisible: boolean) {
	const statusMessageCSS: Record<Status, string> = {
		success: "bg-[#11a839] border-[#048025]",
		error: "bg-[#9b0929] border-[#6c0d0d]",
		idle: "border-[rgba(0,0,0,0)]",
	};
	const parent: Variants = {
		hidden: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: -1,
			},
		},
		visible: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: 1,
			},
		},
	};
	const child: Variants = {
		hidden: {
			opacity: 0,
			y: 15,
			scale: 0.95,
			transition: { duration: 0.15, ease: "easeIn" },
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.15, ease: "easeOut" },
		},
	};
	return (
		<motion.div
			variants={parent}
			layout
			animate={messageVisible ? "visible" : "hidden"}
			className="relative"
		>
			<motion.div
				className={`${statusMessageCSS[iconObject.statusState]} button-padding button-rounding custom-text-primary font-bold border-3 absolute bottom-full left-0 mb-2 w-max`}
				variants={child}
			>
				<QRFormStatusMessage message={iconObject.message} />
			</motion.div>
			<motion.div
				variants={child}
				className={`${statusMessageCSS[iconObject.statusState]} absolute rounded-md bottom-full left-0 w-4 h-4 border-3`}
			/>
		</motion.div>
	);
}
