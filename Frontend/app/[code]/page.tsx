import { redirect, notFound } from "next/navigation";
import { getRedirectUrl } from "@/api/getRedirectUrl";
import { ServiceUnavailableError } from "@/lib/errors/ServiceUnavailableError";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
	const { code } = await params;
	let redirectUrl: string;

	try {
		const response = await getRedirectUrl(code);
		redirectUrl = response.longUrl;
	} catch (err) {
		if (err instanceof ServiceUnavailableError && err.error.status === 404) {
			notFound();
		}

		throw err;
	}

	redirect(redirectUrl);
}
