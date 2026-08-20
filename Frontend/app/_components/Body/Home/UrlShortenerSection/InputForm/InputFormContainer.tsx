import useShortenUrl from "@/hooks/useShortenUrl";
import DisplayUrlContainer from "./DisplayUrlContainer/DisplayUrlContainer";
import Form from "./Form/Form";

export default function InputFormContainer() {
	const { code, shortenUrl } = useShortenUrl();

	return (
		<div className="flex flex-col gap-4 w-full">
			<Form shortenUrl={shortenUrl} />
			<DisplayUrlContainer code={code} />
		</div>
	);
}
