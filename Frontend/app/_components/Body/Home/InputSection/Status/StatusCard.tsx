import FormStatus from "./FormStatus";
import { motion } from "motion/react";

export default function StatusCard({ status }: { status: StatusProp }) {
	return status !== "idle" ? (
		<motion.div
			layout
			initial={{
				opacity: 0,
				y: -30,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				y: 30,
			}}
			transition={{
				duration: 0.3,
			}}
			className="size-full flex items-center justify-center shrink-0"
		>
			<FormStatus status={status} />
		</motion.div>
	) : null;
}
