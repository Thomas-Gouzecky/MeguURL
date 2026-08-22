import { useFormContext } from "@/hooks/useFormContext";
import { motion, Variants } from "motion/react";

export default function FormLoadingOverlay() {
	const { isLoading } = useFormContext();
	const variant: Variants = {
		hidden: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				staggerDirection: -1,
			},
		},
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const item: Variants = {
		hidden: {
			opacity: 0,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				type: "spring",
			},
		},
	};

	const background: Variants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				ease: "easeOut",
			},
		},
	};

	return (
		<motion.div
			className={`flex items-center justify-center absolute inset-0 z-50 rounded-lg ${isLoading ? "pointer-events-auto" : "pointer-events-none"}`}
			variants={variant}
			initial="hidden"
			animate={isLoading ? "visible" : "hidden"}
		>
			<motion.div
				className={`absolute z-5 w-full h-full rounded-lg inset-0 bg-black/40`}
				variants={background}
			/>
			<motion.div
				className="absolute z-10 custom-text-primary font-bold"
				variants={item}
			>
				{/* spinner */} Loading...
			</motion.div>
		</motion.div>
	);
}
