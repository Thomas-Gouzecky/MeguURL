import { motion } from "motion/react";
import StatusMessage from "./StatusMessage/StatusMessage";

export default function StatusMessageContainer({ status }: { status: StatusProp }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 15, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 15, scale: 0.98 }}
			transition={{
				duration: 0.12,
				ease: "easeOut",
			}}
			className="absolute pointer-events-none z-20 bottom-15 left-0 min-w-64 w-[30%] bg-black custom-text-primary font-bold rounded-xl px-4 py-2"
		>
			<StatusMessage status={status} />
		</motion.div>
	);
}
