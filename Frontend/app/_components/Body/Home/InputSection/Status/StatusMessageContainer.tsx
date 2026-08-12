import { motion } from "motion/react";
import StatusMessage from "./StatusMessage/StatusMessage";

export default function StatusMessageContainer({ status }: { status: StatusProp }) {
	const statusMessageCSS: Record<Status, string> = {
		success: "bg-green-500",
		error: "bg-red-500",
		idle: "",
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 15, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 15, scale: 0.98 }}
			transition={{
				duration: 0.12,
				ease: "easeOut",
			}}
			className="absolute pointer-events-none z-20 bottom-15 left-0 min-w-64 w-[30%]"
		>
			<div
				className={`${statusMessageCSS[status.state]} button-padding button-rounding custom-text-primary font-bold border-2 shadow-[-7px_7px_0_rgba(0,0,0,0.5)]`}
			>
				<StatusMessage status={status} />
			</div>
		</motion.div>
	);
}
