import { useState } from "react";
import postLongUrl from "@/api/postLongUrl";

export default function useShortenUrl() {
	const [code, setCode] = useState<string>();
	const [responseError, setResponseError] = useState<PostUrlErrorResponse>();

	async function shortenUrl(url: string): Promise<PostUrlResponse> {
		const response: PostUrlResponse = await postLongUrl(url);

		if (response.success) {
			setCode(response.urlCode);
			setResponseError(undefined);
			// setStatus("success");
		} else {
			setResponseError(response.error);
			setCode(undefined);
			// setStatus("error");
		}

		return response;
	}

	return {
		code,
		responseError,
		shortenUrl,
	};
}
