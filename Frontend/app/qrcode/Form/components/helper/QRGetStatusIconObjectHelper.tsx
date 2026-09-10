import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";

function getStatusIcon({ status, isLoading }: { status: number | null; isLoading: boolean }) {
	if (status === null) return null;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 animate-spin">
				<ImSpinner9 className="w-4 h-4 text-gray-500" />
			</div>
		);
	}

	if (status === 200) {
		return (
			<FaCircleCheck
				color="#20c40a"
				size={32}
			/>
		);
	}

	return (
		<FaTriangleExclamation
			color="#9b0929"
			size={32}
		/>
	);
}

function getStatusMessage({
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
	if (status === null) return null;
	if (isLoading) return "Loading...";
	if (status === 200) return "Success!";
	if (error) return [...(error?.detail.map((err) => err.msg) || "Unknown Error!")];
	return "Unknown Error!";
}
export default function getStatusIconObject({
	status,
	isLoading,
	body,
	error,
}: {
	status: number | null;
	isLoading: boolean;
	body: QrCodeAPIResponse | null;
	error: HTTPValidationError | null;
}): QRFormStatusIconObject {
	return {
		icon: getStatusIcon({ status, isLoading }),
		message: getStatusMessage({ status, isLoading, body: body, error: error }),
	};
}
