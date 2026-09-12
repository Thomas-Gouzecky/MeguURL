import { clsx, type ClassValue } from "clsx";
import { Variants } from "motion";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const BackendUnavailableReponse: PostUrlErrorResponse = {
	title: "Backend Unavailable",
	status: 503,
	detail: "The backend service is currently unavailable.",
};

export const QuickContentsVariants: Variants = {
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

export const QuickContentsItem: Variants = {
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

export const formInputStatusStyles: Record<Status, string> = {
	success:
		"text-[#2aa136] hover:border-green-500 hover:text-green-500 focus:border-green-500 focus:text-green-500 focus:shadow-[0_0_10px_3px_rgba(34,231,94,0.35)]",

	error: "text-[#880808] border-[#6c0d0d] hover:border-[#9b0929] hover:text-[#ad0303] focus:border-[#9b0929] focus:text-[#ad0303] focus:shadow-[0_0_10px_3px_rgba(255,48,48,0.35)]",

	idle: "border-[#402a2a] text-[#ccb14e] hover:border-[#87732a] hover:text-[#fada64] focus:border-[#a78f3b] focus:text-[#fada64] focus:shadow-[0_0_10px_3px_rgba(167,143,59,0.35)]",
};
