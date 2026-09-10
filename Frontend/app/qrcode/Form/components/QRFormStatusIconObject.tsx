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
	error: HTTPValidationError | ServiceUnavailableResponse | null;
}) {
	const [messageVisible, setMessageVisible] = useState<boolean>(false);
	const [hovered, setHovered] = useState<boolean>(false);
	const iconObject: QRFormStatusIconObject = getStatusIconObject({ status, isLoading, body, error });
	const statusMessageCSS: Record<Status, string> = {
		success: "bg-[#11a839] border-[#048025]",
		error: "bg-[#9b0929] border-[#6c0d0d]",
		idle: "border-[rgba(0,0,0,0)]",
	};

	return (
		<div className="flex size-full items-center justify-start">
			<motion.div
				onHoverStart={() => setHovered(true)}
				onHoverEnd={() => setHovered(false)}
				className="relative flex items-center justify-center"
			>
				<AnimatePresence mode="popLayout">
					<StatusIconContainer
						status={status}
						isLoading={isLoading}
						iconObject={iconObject}
						statusMessageCSS={statusMessageCSS}
						setMessageVisible={setMessageVisible}
						messageVisible={messageVisible}
					/>
				</AnimatePresence>
				<AnimatePresence mode="wait">
					{(messageVisible || hovered) && (
						<MessageContainer
							key={`${iconObject.statusState}-${iconObject.message}`}
							statusMessageCSS={statusMessageCSS}
							iconObject={iconObject}
						/>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
function StatusIconContainer({
	status,
	isLoading,
	iconObject,
	statusMessageCSS,
	setMessageVisible,
	messageVisible,
}: {
	status: number | null;
	isLoading: boolean;
	iconObject: QRFormStatusIconObject;
	statusMessageCSS: Record<Status, string>;
	setMessageVisible: React.Dispatch<React.SetStateAction<boolean>>;
	messageVisible: boolean;
}) {
	const HoverIconButton = (iconObject: QRFormStatusIconObject) => {
		return (
			<motion.button
				className="z-20"
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
		<motion.div
			key={`${status}-${isLoading}`}
			className="flex size-10 origin-center items-center justify-center flex-col gap-1"
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.5 }}
			transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
		>
			{HoverIconButton(iconObject)}

			<motion.div
				className={`${statusMessageCSS[iconObject.statusState]} w-[80%] h-0.5 rounded-lg origin-center`}
				animate={{
					opacity: messageVisible ? 1 : 0,
					scaleX: messageVisible ? "100%" : 0,
				}}
				transition={{
					duration: 0.2,
					ease: "easeOut",
				}}
			/>
		</motion.div>
	);
}

function MessageContainer({
	statusMessageCSS,
	iconObject,
}: {
	statusMessageCSS: Record<Status, string>;
	iconObject: QRFormStatusIconObject;
}) {
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
			initial="hidden"
			animate="visible"
			exit="hidden"
			className="absolute bottom-full left-0 -translate-y-1 w-fit min-w-64 max-w-[70%] select-text"
		>
			<motion.div
				className={`${statusMessageCSS[iconObject.statusState]} button-padding button-rounding custom-text-primary font-bold border-3 mb-2 w-max`}
				variants={child}
			>
				<QRFormStatusMessage message={iconObject.message} />
			</motion.div>

			{/* Bubble Icon */}
			<motion.div
				variants={child}
				className={`${statusMessageCSS[iconObject.statusState]} relative rounded-md bottom-full left-3 w-4 h-4 border-3`}
			/>
		</motion.div>
	);
}
