import { motion } from "motion/react";
import DisplayUrl from "./DisplayUrl";
import { QuickContentsItem } from "@/lib/utils";

export default function DisplayUrlContainer({
	code,
	animationState,
}: {
	code: string | undefined;
	animationState: AnimateStates;
}) {
	return (
		<motion.div
			variants={QuickContentsItem}
			className="h-15 w-fit flex justify-center items-center"
		>
			<DisplayUrl
				code={code ? code : null}
				animationState={animationState}
			/>
		</motion.div>
	);
}
