import useShortenUrl from "@/hooks/useShortenUrl";
import DisplayUrlContainer from "./DisplayUrlContainer/DisplayUrlContainer";
import Form from "./Form/Form";
import { FormProvider } from "@/hooks/useFormContext";

export default function InputFormContainer() {
	const { code, isLoading, shortenUrl } = useShortenUrl();

	return (
		<div className="flex flex-col gap-4 w-full">
			<FormProvider isLoading={isLoading}>
				<Form shortenUrl={shortenUrl} />
			</FormProvider>
			<DisplayUrlContainer code={code} />
		</div>
	);
}
