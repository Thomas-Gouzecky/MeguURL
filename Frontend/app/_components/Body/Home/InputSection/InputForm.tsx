"use client";

import { useState } from "react";
import postLongUrl from "@/api/postLongUrl";

export default function InputForm() {
	const [inputUrl, setInputUrl] = useState<string>("");
	const [code, setCode] = useState<string | undefined>();
	const [error, setError] = useState<string | undefined>();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const response: PostUrlResponse = await postLongUrl(inputUrl);

		if (response.success) {
			setCode(response.urlCode);
		} else {
			setError(response.error);
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<form onSubmit={handleSubmit}>
				<input
					className="bg-white border-4 border-amber-600 text-red-600"
					type="text"
					value={inputUrl}
					onChange={(e) => setInputUrl(e.target.value)}
				/>
				<button
					className="hover:cursor-pointer bg-indigo-950 border-amber-600 border-4"
					type="submit"
				>
					Shorten URL
				</button>
			</form>
			{code && <span>Code: {code}</span>}
			{error && <span>Error: {error}</span>}
		</div>
	);
}
