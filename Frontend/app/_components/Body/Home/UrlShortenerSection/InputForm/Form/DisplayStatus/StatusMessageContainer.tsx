import { motion, Variants } from "motion/react";
import StatusMessage from "./StatusMessage/StatusMessage";

export default function StatusMessageContainer({ status }: { status: StatusProp }) {
	const statusMessageCSS: Record<Status, string> = {
		success: "bg-[#11a839] border-[#048025]",
		error: "bg-[#9b0929] border-[#6c0d0d]",
		idle: "",
	};

	const container: Variants = {
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

	const item: Variants = {
		hidden: { opacity: 0, y: 15, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } },
		visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: "easeOut" } },
	};

	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className="absolute z-20 bottom-31 md:bottom-18 -left-3 md:-left-2.5 w-fit min-w-64 max-w-[70%] select-text"
		>
			<motion.div
				variants={item}
				className={`${statusMessageCSS[status.state]} button-padding button-rounding custom-text-primary font-bold border-3`}
			>
				<StatusMessage status={status} />
			</motion.div>
			<motion.div
				variants={item}
				className={`${statusMessageCSS[status.state]} absolute rounded-md left-6 -bottom-6 w-4 h-4 border-3`}
			/>
		</motion.div>
	);
}
