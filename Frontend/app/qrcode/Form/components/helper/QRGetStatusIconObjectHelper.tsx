import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";

function getStatusIcon({ status, isLoading }: { status: number | null; isLoading: boolean }) {
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

	if (status === null) return null;

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
	error,
}: {
	status: number | null;
	isLoading: boolean;
	error: HTTPValidationError | ServiceUnavailableResponse | null;
}) {
	if (status === null) return null;
	if (isLoading) return "Loading...";
	if (status === 200) return "Success!";
	if (!error) return "Unknown Error!";
	if (typeof error.detail === "string") return error.detail;
	if (Array.isArray(error.detail)) return error.detail.map((err) => err.msg);

	return "Unknown Error!";
}
export default function getStatusIconObject({
	status,
	isLoading,
	error,
}: {
	status: number | null;
	isLoading: boolean;
	body: QrCodeAPIResponse | null;
	error: HTTPValidationError | ServiceUnavailableResponse | null;
}): QRFormStatusIconObject {
	const statusState = status === 200 ? "success" : status !== null ? "error" : "idle";
	return {
		statusState: statusState,
		icon: getStatusIcon({ status, isLoading }),
		message: getStatusMessage({ status, isLoading, error: error }),
	};
}
