"use client";

import useShortenUrl from "@/hooks/useShortenUrl";
import DisplayUrlContainer from "./DisplayUrlContainer/DisplayUrlContainer";
import Form from "./Form/Form";
import { FormProvider } from "@/hooks/useFormContext";
import DisplayQRCodeCreatorContainer from "./CreateQRCodeCreator/DisplayQRCodeCreatorContainer";

export default function InputFormContainer() {
	const { code, isLoading, shortenUrl } = useShortenUrl();

	return (
		<div className="flex flex-col gap-4 w-full">
			<FormProvider isLoading={isLoading}>
				<Form shortenUrl={shortenUrl} />
			</FormProvider>
			<div className="flex flex-row justify-center items-center w-full">
				<DisplayUrlContainer code={code} />
				<DisplayQRCodeCreatorContainer code={code} />
			</div>
		</div>
	);
}
