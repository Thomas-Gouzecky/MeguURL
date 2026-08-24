import { redirect } from "next/navigation";
import { getRedirectUrl } from "@/api/getRedirectUrl";
import ErrorDisplay from "./ErrorDisplay";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
	const { code } = await params;
	let redirectUrl: string;

	try {
		const response = await getRedirectUrl(code);

		if (!response.success) {
			return <ErrorDisplay error={response.error} />;
		}

		redirectUrl = response.longUrl;
	} catch (err) {
		throw err;
	}

	redirect(redirectUrl);
}
