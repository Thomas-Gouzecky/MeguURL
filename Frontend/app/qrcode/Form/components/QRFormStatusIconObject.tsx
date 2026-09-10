import getStatusIconObject from "./helper/QRGetStatusIconObjectHelper";

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
		<div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200">
			{iconObject.icon}
			<div>Message: {iconObject.message}</div>
		</div>
	);
}
