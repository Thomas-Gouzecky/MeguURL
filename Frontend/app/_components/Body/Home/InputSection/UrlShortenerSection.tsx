import InputFormContainer from "./InputFormContainer";
import Image from "next/image";

export default function UrlShortenerSection() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col justify-center items-center gap-2">
				<div className="flex justify-center items-center gap-4 text-shadow-[3px_3px_8px_rgba(0,0,0,0.5)]">
					<h1 className="w-fit custom-text-primary lg:text-4xl text-lg font-[futura]">
						Paste your url to explode it!
					</h1>
					<Image
						className="shadow-[3px_3px_8px_rgba(0,0,0,0.5)] w-[12%]"
						src={"/megumin_explosion.gif"}
						alt="Megumin Exploding Things"
						width={125}
						height={1}
						unoptimized
					/>
				</div>
				<div className="h-0.5 w-[80%] bg-linear-to-r via-[#796623]" />
			</div>
			<InputFormContainer />
		</div>
	);
}
