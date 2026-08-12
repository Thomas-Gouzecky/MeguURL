"use client";

import FormStatus from "./FormStatus";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import StatusMessageContainer from "./StatusMessageContainer";

export default function StatusCard({ status }: { status: StatusProp }) {
	const [hovered, setHovered] = useState<boolean>(false);
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
			onHoverStart={() => setHovered(true)}
			onHoverEnd={() => setHovered(false)}
		>
			<FormStatus status={status} />
			<AnimatePresence>{hovered && <StatusMessageContainer status={status} />}</AnimatePresence>
		</motion.div>
	) : null;
}
