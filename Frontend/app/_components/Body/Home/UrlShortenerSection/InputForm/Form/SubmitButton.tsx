import { GiMineExplosion } from "react-icons/gi";
import { useFormContext } from "@/hooks/useFormContext";

export default function SubmitButton() {
	const { isLoading } = useFormContext();

	return (
		<button
			className="w-full h-fit bg-[#1f1414] border-2 border-[#402a2a] active:scale-102 md:active:scale-105 hover:scale-105 md:hover:scale-110 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.25)] hover:border-[#6c3030] group clickable-text-color button-padding button-rounding relative text-lg font-bold overflow-hidden transition-all duration-300"
			type="submit"
			disabled={isLoading}
		>
			{/* Background gradient */}
			<span className="absolute inset-0 bg-radial-[at_50%_100%] from-[#622626] via-[#271313] to-[#050303] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			<GiMineExplosion
				size={24}
				className="z-20 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-[calc(210%)] transition-all duration-300 group-hover:scale-115 group-hover:-translate-y-[calc(40%)] group-hover:-translate-x-1/2"
			/>

			<div className="flex justify-center items-center gap-2">
				{/* Fake Icon */}
				<GiMineExplosion
					size={24}
					className="opacity-0"
				/>
				<span className="block group-hover:opacity-0 group-hover:translate-y-7 transition-all duration-300">
					Explode
				</span>
			</div>
		</button>
	);
}
