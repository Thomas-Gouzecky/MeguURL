import { redirect, notFound } from "next/navigation";
import { getRedirectUrl } from "@/api/getRedirectUrl";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
	const { code } = await params;
	let redirectUrl: string;

	try {
		const response = await getRedirectUrl(code);
		redirectUrl = response.longUrl;
	} catch (err) {
		notFound();
	}

	redirect(redirectUrl);
}
