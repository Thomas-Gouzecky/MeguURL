import getStatusIconObject from "./helper/QRGetStatusIconObjectHelper";
import QRFormStatusMessage from "./QRFormStatusMessage";

export default function QRFormStatusIconObject({
	status,
	isLoading,
	body,
	error,
}: {
	status: number | null;
	isLoading: boolean;
	body: QrCodeAPIResponse | null;
	error: HTTPValidationError | null;
}) {
	const iconObject: QRFormStatusIconObject = getStatusIconObject({ status, isLoading, body, error });

	return (
		<div className="flex items-center justify-start size-full relative">
			{iconObject.icon}

			<QRFormStatusMessage message={iconObject.message} />
		</div>
	);
}
