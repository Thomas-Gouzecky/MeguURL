"use client";

import { useState } from "react";
import useStatusQueue from "@/hooks/useStatusQueue";
import FormBody from "./FormBody";

export default function Form({ shortenUrl }: { shortenUrl(url: string): Promise<PostUrlResponse> }) {
	const { statusQueue, pushStatus } = useStatusQueue();

	const [status, setStatus] = useState<StatusProp>({ state: "idle" });

	async function handleSubmit(formData: FormData) {
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
					w-full px-4 py-3 rounded-lg
				`}
			action={handleSubmit}
		>
			<FormBody
				statusQueue={statusQueue}
				status={status}
			/>
		</form>
	);
}
