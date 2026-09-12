import { useEffect, useState } from "react";
import DisplayQRCodeCreatorContainer from "./CreateQRCodeCreator/DisplayQRCodeCreatorContainer";
import DisplayUrlContainer from "./DisplayUrlContainer/DisplayUrlContainer";
import { AnimatePresence, motion } from "motion/react";
import { QuickContentsItem, QuickContentsVariants } from "@/lib/utils";

export default function QuickContents({ code }: { code: string | undefined }) {
	const normalizedCode = code ?? null;
	const [previousCode, setPreviousCode] = useState<string | null>(null);
	const [animationState, setAnimationState] = useState<AnimateStates>("hidden");

	if (normalizedCode !== previousCode) {
		setAnimationState(previousCode && code ? "bounce" : code ? "visible" : "hidden");
		setPreviousCode(normalizedCode);
	}

	useEffect(() => {
		if (animationState === "bounce") {
			const timer = setTimeout(() => {
				setAnimationState("visible");
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [animationState]);

	return (
		<AnimatePresence mode="popLayout">
			<motion.div
				variants={QuickContentsVariants}
				initial="hidden"
				animate={animationState}
				className="flex flex-row justify-center items-center w-full gap-4"
			>
				<motion.div variants={QuickContentsItem}>
					<DisplayUrlContainer
						code={code}
						animationState={animationState}
					/>
				</motion.div>
				<AnimatePresence mode="popLayout">
					{code && (
						<DisplayQRCodeCreatorContainer
							key="qr-code-creator"
							code={code}
							animationState={animationState}
						/>
					)}
				</AnimatePresence>
				{/* <DisplayQRCodeCreatorContainer code={code} /> */}
			</motion.div>
		</AnimatePresence>
	);
}
