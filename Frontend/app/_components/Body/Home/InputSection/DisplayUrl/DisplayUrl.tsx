"use client";

import Link from "next/link";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import { motion, Variants } from "motion/react";
import { useState, useRef, useEffect } from "react";

type AnimateStates = "visible" | "hidden" | "bounce";

export default function DisplayUrl({ code }: { code: string | null }) {
	const baseURL = process.env.NEXT_PUBLIC_FRONTEND;
	const previousCode = useRef<string | null>(null);
	const [animationState, setAnimationState] = useState<AnimateStates>("hidden");

	const variants: Variants = {
		hidden: {
			opacity: 0,
			transition: {
				staggerChildren: 0.1,
				staggerDirection: -1,
			},
		},

		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},

		bounce: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	const item: Variants = {
		hidden: {
			scale: 0.85,
			opacity: 0,
		},

		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 0.2,
				ease: "easeOut",
			},
		},

		bounce: {
			scale: [1, 1.05, 1],
			opacity: 1,
			transition: {
				duration: 0.2,
				ease: "easeOut",
				repeat: 0,
			},
		},
	};

	useEffect(() => {
		function animateState(): AnimateStates {
			if (previousCode.current && code) {
				return "bounce";
			}

			if (!code) {
				return "hidden";
			}

			return "visible";
		}

		setAnimationState(animateState());
		if (code) previousCode.current = code;
	}, [code]);

	useEffect(() => {
		if (animationState === "bounce") {
			const timer = setTimeout(() => {
				setAnimationState("visible");
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [animationState]);

	return (
		<motion.div
			variants={variants}
			initial="hidden"
			animate={animationState}
			className="bg-[#1f1414] border-2 border-[#402a2a] button-rounding flex justify-center font-bold"
		>
			<motion.div className="flex items-center justify-center gap-4 text-lg w-fit px-4 py-3 rounded-xl">
				<motion.div variants={item}>
					<Link
						className="group relative inline-block clickable-text-color transition-all duration-300"
						href={code ? code : "/"}
						target="_blank"
					>
						{baseURL + (previousCode.current ?? "")}

						<span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FADA64] to-transparent transition-all duration-500 group-hover:w-3/4" />
					</Link>
				</motion.div>
				<motion.div variants={item}>
					<CopyButton
						className="clickable-text-color bg-[#471414] clickable-text-color overflow-hidden flex max-w-sm max-h-12 border-transparent border-2 button-padding button-rounding transition-all duration-300 hover:bg-[#260707] hover:inset-shadow-2xs hover:border-[#5E3131]"
						content={baseURL + (code ?? "")}
					/>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
