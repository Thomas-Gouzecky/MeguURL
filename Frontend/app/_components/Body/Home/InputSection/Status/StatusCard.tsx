"use client";

import FormStatus from "./FormStatus";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import StatusMessageContainer from "./StatusMessageContainer";

export default function StatusCard({ status }: { status: StatusProp }) {
	const [hovered, setHovered] = useState<boolean>(false);
	const [clicked, setClicked] = useState<boolean>(false);
	return status.state !== "idle" ? (
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
			<motion.div
				onHoverStart={() => setHovered(true)}
				onHoverEnd={() => setHovered(false)}
				onClick={() => setClicked(!clicked)}
			>
				<FormStatus status={status} />

				<AnimatePresence>{(hovered || clicked) && <StatusMessageContainer status={status} />}</AnimatePresence>
			</motion.div>
		</motion.div>
	) : null;
}
