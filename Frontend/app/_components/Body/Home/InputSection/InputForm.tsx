"use client";

import { useState } from "react";
import useShortenUrl from "@/hooks/useShortenUrl";
import useStatusQueue from "@/hooks/useStatusQueue";
import DisplayStatus from "./Status/DisplayStatus";
import { GiMineExplosion } from "react-icons/gi";

type Status = "success" | "error" | "idle";

export default function InputForm() {
	const [inputUrl, setInputUrl] = useState("");

	const { code, responseError, shortenUrl } = useShortenUrl();

	const { statusQueue, pushStatus } = useStatusQueue();

	const [status, setStatus] = useState<StatusProp>({ state: "idle" });

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const result = await shortenUrl(inputUrl);

		console.log(responseError);

		const newStatus: StatusProp = result.success ? { state: "success" } : { state: "error", error: result.error! };

		setStatus(newStatus);

		const id = crypto.randomUUID();

		pushStatus({ id: id, status: newStatus });
	}

	const statusStyle: Record<Status, string> = {
		success:
			"text-[#2aa136] hover:border-green-500 hover:text-green-500 focus:border-green-500 focus:text-green-500 focus:shadow-[0_0_10px_3px_rgba(34,231,94,0.35)]",

		error: "text-[#880808] border-[#6c0d0d] hover:border-[#9b0929] hover:text-[#ad0303] focus:border-[#9b0929] focus:text-[#ad0303] focus:shadow-[0_0_10px_3px_rgba(255,48,48,0.35)]",

		idle: "border-transparent text-[#ccb14e] hover:border-[#87732a] hover:text-[#fada64] focus:border-[#a78f3b] focus:text-[#fada64] focus:shadow-[0_0_10px_3px_rgba(167,143,59,0.35)]",
	};
	return (
		<div className="flex flex-col gap-4 w-full">
			<form
				className={`
					flex flex-row items-center gap-4
					w-full px-4 py-3 rounded-lg
				`}
				onSubmit={handleSubmit}
			>
				<div className="relative flex items-center w-full gap-2">
					<DisplayStatus statusQueue={statusQueue} />

					<div className="flex items-center gap-4 w-full">
						<input
							className={`${statusStyle[status.state]} flex-1 z-10 origin-center bg-black outline-none focus:scale-100 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.25)] border-2 button-padding button-rounding relative text-lg font-bold overflow-hidden transition-all duration-300`}
							type="text"
							value={inputUrl}
							placeholder="Example: google.com"
							onChange={(e) => setInputUrl(e.target.value)}
						/>

						<button
							className="shrink-0 bg-black active:scale-105 hover:scale-110 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.25)] border-transparent border-2 hover:border-[#6c3030] group clickable-text-color button-padding button-rounding relative text-lg font-bold overflow-hidden transition-all duration-300"
							type="submit"
						>
							{/* Background gradient */}
							<span className="absolute inset-0 bg-radial-[at_50%_100%] from-[#622626] via-[#271313] to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

							<GiMineExplosion
								size={24}
								className="z-20 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-[calc(210%)] transition-all duration-300 group-hover:scale-115 group-hover:-translate-y-[calc(40%)] group-hover:-translate-x-1/2"
							/>

							<div className="flex items-center gap-2">
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
					</div>
				</div>
			</form>

			{code && <span>Code: {code}</span>}

			{/* {error && <span>Error: {error}</span>} */}
		</div>
	);
}
