import Link from "next/link";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";

export default function DisplayUrl({ code }: { code: string }) {
	const baseURL = process.env.NEXT_PUBLIC_FRONTEND;
	const redirectURL = baseURL + code;

	return (
		<div className="flex justify-center font-bold">
			<div className="flex items-center justify-center gap-4 text-lg w-fit px-4 py-3 rounded-xl">
				<Link
					className="group relative inline-block clickable-text-color transition-all duration-300"
					href={code}
					target="_blank"
				>
					{redirectURL}

					<span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FADA64] to-transparent transition-all duration-500 group-hover:w-3/4" />
				</Link>
				<CopyButton
					className="clickable-text-color bg-[#471414] clickable-text-color overflow-hidden flex max-w-sm max-h-12 border-transparent border-2 button-padding button-rounding transition-all duration-300 hover:bg-[#260707] hover:inset-shadow-2xs hover:border-[#5E3131]"
					content={redirectURL}
				/>
			</div>
		</div>
	);
}
