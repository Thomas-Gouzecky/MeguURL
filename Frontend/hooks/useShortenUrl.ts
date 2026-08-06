import { useState } from "react";
import postLongUrl from "@/api/postLongUrl";

export default function useShortenUrl() {
	const [code, setCode] = useState<string>();
	const [error, setError] = useState<string>();
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

	async function shortenUrl(url: string) {
		const response: PostUrlResponse = await postLongUrl(url);

		if (response.success) {
			setCode(response.urlCode);
			setError(undefined);
			setStatus("success");
		} else {
			setError(response.error);
			setCode(undefined);
			setStatus("error");
		}
	}

	return {
		code,
		error,
		status,
		shortenUrl,
	};
}
