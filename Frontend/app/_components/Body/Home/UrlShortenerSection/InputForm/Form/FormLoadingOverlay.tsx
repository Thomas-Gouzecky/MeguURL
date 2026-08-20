import { motion } from "motion/react";
import { useFormStatus } from "react-dom";

export default function FormLoadingOverlay() {
	const { pending } = useFormStatus();

	if (!pending) return null;

	return (
		<div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-black/40">
			<div className="animate-spin">{/* spinner */} Loading...</div>
		</div>
	);
}
