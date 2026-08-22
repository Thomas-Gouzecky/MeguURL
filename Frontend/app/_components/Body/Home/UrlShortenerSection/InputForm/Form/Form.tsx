"use client";

import { useState } from "react";
import useStatusQueue from "@/hooks/useStatusQueue";
import FormBody from "./FormBody";
import FormLoadingOverlay from "./FormLoadingOverlay";

export default function Form({ shortenUrl }: { shortenUrl(url: string): Promise<PostUrlResponse> }) {
	const { statusQueue, pushStatus } = useStatusQueue();

	const [status, setStatus] = useState<StatusProp>({ state: "idle" });

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const inputUrl = formData.get("inputUrl") as string;

		const result = await shortenUrl(inputUrl);

		const newStatus: StatusProp = result.success ? { state: "success" } : { state: "error", error: result.error! };

		setStatus(newStatus);

		const id = crypto.randomUUID();

		pushStatus({ id: id, status: newStatus });
	}

	return (
		<form
			className={`
					flex flex-row items-center gap-4
					w-full px-4 py-3 rounded-lg relative
				`}
			onSubmit={handleSubmit}
		>
			<FormLoadingOverlay />
			<FormBody
				statusQueue={statusQueue}
				status={status}
			/>
		</form>
	);
}
