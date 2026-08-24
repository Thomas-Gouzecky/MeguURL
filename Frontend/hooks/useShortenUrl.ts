import { useState } from "react";
import postLongUrl from "@/api/postLongUrl";

export default function useShortenUrl() {
	const [code, setCode] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function shortenUrl(url: string): Promise<PostUrlResponse> {
		if (url.trim() === "") {
			const errorResponse: PostUrlErrorResponse = {
				title: "Invalid URL",
				status: 400,
				detail: "Please enter a URL.",
			};

			return { success: false, status: errorResponse.status, error: errorResponse };
		}
		setIsLoading(true);

		const response: PostUrlResponse = await postLongUrl(url);

		if (response.success) {
			setCode(response.urlCode);
		} else {
			setCode(undefined);
		}

		try {
			return response;
		} finally {
			setIsLoading(false);
		}
	}

	return {
		code,
		isLoading,
		shortenUrl,
	};
}
