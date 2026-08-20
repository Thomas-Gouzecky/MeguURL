import useShortenUrl from "@/hooks/useShortenUrl";
import DisplayUrlContainer from "./DisplayUrl/DisplayUrlContainer";
import InputForm from "./InputForm";

export default function InputFormContainer() {
	const { code, shortenUrl } = useShortenUrl();

	return (
		<div className="flex flex-col gap-4 w-full">
			<InputForm shortenUrl={shortenUrl} />
			<DisplayUrlContainer code={code} />
		</div>
	);
}
