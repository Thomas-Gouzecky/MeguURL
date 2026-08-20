import useShortenUrl from "@/hooks/useShortenUrl";
import DisplayUrlContainer from "./DisplayUrl/DisplayUrlContainer";
import ShortenUrlForm from "./ShortenUrlForm";

export default function InputFormContainer() {
	const { code, shortenUrl } = useShortenUrl();

	return (
		<div className="flex flex-col gap-4 w-full">
			<ShortenUrlForm shortenUrl={shortenUrl} />
			<DisplayUrlContainer code={code} />
		</div>
	);
}
