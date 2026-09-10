import { motion } from "motion/react";
import DisplayQRCodeCreator from "./DisplayQRCodeCreator";
import { QuickContentsItem } from "@/lib/utils";

export default function DisplayQRCodeCreatorContainer({
	code,
	animationState,
}: {
	code: string;
	animationState: AnimateStates;
}) {
	return (
		<motion.div
			variants={QuickContentsItem}
			animate={animationState}
			initial="hidden"
			exit="hidden"
			className="w-fit flex justify-center items-center bg-[#1f1414] border-2 border-[#402a2a] button-rounding"
		>
			<DisplayQRCodeCreator code={code} />
		</motion.div>
	);
}
