import { redirect, notFound } from "next/navigation";
import { getRedirectUrl } from "@/api/getRedirectUrl";
import ErrorDisplay from "./ErrorDisplay";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
	const { code } = await params;
	let redirectUrl: string;

	try {
		const response = await getRedirectUrl(code);

		if (!response.success) {
			if (response.status === 404) {
				notFound();
			}

			return (
				<ErrorDisplay
					status={response.status}
					error={response.error}
				/>
			);
		}

		redirectUrl = response.longUrl;
	} catch (err) {
		throw err;
	}

	redirect(redirectUrl);
}
