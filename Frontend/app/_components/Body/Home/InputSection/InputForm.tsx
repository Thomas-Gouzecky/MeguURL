"use client";

import { useState } from "react";
import useShortenUrl from "@/hooks/useShortenUrl";
import FormStatus from "./FormStatus";
import ClickableButton from "@/app/_components/ClickableButton";
import { GiMineExplosion } from "react-icons/gi";

export default function InputForm() {
	const [inputUrl, setInputUrl] = useState("");

	const { code, error, status, shortenUrl } = useShortenUrl();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		await shortenUrl(inputUrl);
	}

	const statusStyle = {
		success: "bg-green-300 border-green-500 border-3",
		error: "bg-red-300 border-red-500 border-3",
		idle: "",
	};

	return (
		<div className="flex flex-col gap-4">
			<form
				className={`
					${statusStyle[status]}
					flex flex-row items-center gap-4
					w-fit px-4 py-3 rounded-lg
				`}
				onSubmit={handleSubmit}
			>
				<FormStatus status={status} />

				<input
					className="bg-white border-4 border-amber-600 text-red-600"
					type="text"
					value={inputUrl}
					onChange={(e) => setInputUrl(e.target.value)}
				/>

				<button
					className="bg-black hover:scale-110 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.25)] border-transparent border-2 hover:border-[#6c3030] w-full group clickable-text-color button-padding button-rounding relative text-lg font-bold overflow-hidden transition-all duration-300"
					type="submit"
				>
					{/* Background gradient */}
					<span className="absolute inset-0 bg-radial-[at_50%_100%] from-[#622626] via-[#271313] to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					<GiMineExplosion
						size={24}
						className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-[calc(210%)] transition-all duration-300 group-hover:-translate-x-1/2"
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
			</form>

			{code && <span>Code: {code}</span>}

			{error && <span>Error: {error}</span>}
		</div>
	);
}
