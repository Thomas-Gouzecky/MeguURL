"use client";

import { useState } from "react";
import useShortenUrl from "@/hooks/useShortenUrl";
import FormStatus from "./FormStatus";

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
					className="bg-indigo-950 border-amber-600 button-padding button-rounding relative text-lg font-bold"
					type="submit"
				>
					Explode
				</button>
			</form>

			{code && <span>Code: {code}</span>}

			{error && <span>Error: {error}</span>}
		</div>
	);
}
