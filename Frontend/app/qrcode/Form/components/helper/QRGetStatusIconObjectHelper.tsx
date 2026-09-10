import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";

function getStatusIcon({ status, isLoading }: { status: number | null; isLoading: boolean }) {
	if (status === null) return null;

	if (isLoading) {
		return (
			<ImSpinner9
				className="text-gray-500"
				size={32}
			/>
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
	const statusState = status === 200 ? "success" : status !== null ? "error" : "idle";
	return {
		statusState: statusState,
		icon: getStatusIcon({ status, isLoading }),
		message: getStatusMessage({ status, isLoading, body: body, error: error }),
	};
}
