import { AnimatePresence } from "motion/react";
import StatusCard from "./StatusCard";

export default function DisplayStatus({ statusQueue }: { statusQueue: StatusItem[] }) {
	return (
		<div className="flex flex-col gap-2 size-12 overflow-hidden">
			<AnimatePresence mode="popLayout">
				{statusQueue.map((item) => (
					<StatusCard
						status={item.status}
						key={item.id}
					/>
				))}
			</AnimatePresence>
		</div>
	);
}
