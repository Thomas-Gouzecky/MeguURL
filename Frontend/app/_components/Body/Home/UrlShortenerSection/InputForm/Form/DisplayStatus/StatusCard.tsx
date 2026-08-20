"use client";

import FormStatus from "./FormStatus";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import StatusMessageContainer from "./StatusMessageContainer";

export default function StatusCard({ status, queueSignature }: { status: StatusProp; queueSignature?: string }) {
	const [hovered, setHovered] = useState<boolean>(false);
	const [clicked, setClicked] = useState<boolean>(false);

	const [suppressMessageAnimation, setSuppressMessageAnimation] = useState(false);
	const suppressTimer = useRef<number | null>(null);

	const statusMessageCSS: Record<Status, string> = {
		success: "bg-[#11a839]",
		error: "bg-[#9b0929]",
		idle: "",
	};

	useEffect(() => {
		setHovered(false);
		setClicked(false);
		setSuppressMessageAnimation(true);

		if (suppressTimer.current) {
			window.clearTimeout(suppressTimer.current);
		}
		// Clear suppression quickly after change so future interactions animate normally.
		suppressTimer.current = window.setTimeout(() => {
			setSuppressMessageAnimation(false);
			suppressTimer.current = null;
		}, 50);

		return () => {
			if (suppressTimer.current) {
				window.clearTimeout(suppressTimer.current);
				suppressTimer.current = null;
			}
		};
	}, [queueSignature]);

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
			>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={(e) => {
						e.preventDefault();
						setClicked(!clicked);
					}}
					transition={{
						type: "spring",
						stiffness: 400,
						damping: 20,
					}}
				>
					<FormStatus status={status} />
				</motion.button>

				{suppressMessageAnimation ? (
					(hovered || clicked) && <StatusMessageContainer status={status} />
				) : (
					<AnimatePresence>
						{(hovered || clicked) && <StatusMessageContainer status={status} />}
					</AnimatePresence>
				)}

				<motion.div
					className={`${statusMessageCSS[status.state]} w-full h-0.5 rounded-lg origin-center`}
					animate={{
						opacity: clicked ? 1 : 0,
						scaleX: clicked ? "100%" : 0,
					}}
					transition={{
						duration: 0.2,
						ease: "easeOut",
					}}
				/>
			</motion.div>
		</motion.div>
	) : null;
}
