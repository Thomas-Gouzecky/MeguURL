import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const BackendUnavailableReponse: PostUrlErrorResponse = {
	title: "Backend Unavailable",
	status: 503,
	detail: "The backend service is currently unavailable.",
};
