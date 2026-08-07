import { useState } from "react";
import postLongUrl from "@/api/postLongUrl";

export default function useShortenUrl() {
	const [code, setCode] = useState<string>();
	const [error, setError] = useState<string>();

	async function shortenUrl(url: string): Promise<PostUrlResponse> {
		const response: PostUrlResponse = await postLongUrl(url);

		if (response.success) {
			setCode(response.urlCode);
			setError(undefined);
			// setStatus("success");
		} else {
			setError(response.error);
			setCode(undefined);
			// setStatus("error");
		}

		return response;
	}

	return {
		code,
		error,
		shortenUrl,
	};
}
