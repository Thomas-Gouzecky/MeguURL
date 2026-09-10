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
