"use client";

import Link from "next/link";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import { motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { QuickContentsItem, QuickContentsVariants } from "@/lib/utils";

export default function DisplayUrl({ code, animationState }: { code: string | null; animationState: AnimateStates }) {
	const baseURL = useSyncExternalStore(
		() => () => {},
		() => window.location.host,
		() => "",
	);

	return (
		<motion.div
			className={`bg-[#1f1414] border-2 border-[#402a2a] button-rounding flex justify-center font-bold ${animationState === "hidden" ? "pointer-events-none" : "pointer-events-auto"}`}
		>
			<motion.div className="flex items-center justify-center gap-4 text-lg w-fit px-4 py-3 rounded-xl">
				<motion.div variants={QuickContentsItem}>
					<Link
						className="group relative inline-block clickable-text-color transition-all duration-300"
						href={code ? code : "/"}
						target="_blank"
					>
						{baseURL + "/" + (code ?? "")}

						<span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FADA64] to-transparent transition-all duration-500 group-hover:w-3/4" />
					</Link>
				</motion.div>
				<motion.div variants={QuickContentsItem}>
					<CopyButton
						className="clickable-text-color bg-[#471414] clickable-text-color overflow-hidden flex max-w-sm max-h-12 border-transparent border-2 button-padding button-rounding transition-all duration-300 hover:bg-[#260707] hover:inset-shadow-2xs hover:border-[#5E3131]"
						content={baseURL + "/" + (code ?? "")}
					/>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
