import { FaTriangleExclamation, FaCircleCheck } from "react-icons/fa6";

export default function FormStatus({ status }: { status: StatusProp }) {
	if (status.state === "error") {
		return (
			<FaTriangleExclamation
				color="#9b0929"
				size={32}
			/>
		);
	}

	if (status.state === "success") {
		return (
			<FaCircleCheck
				color="#20c40a"
				size={32}
			/>
		);
	}

	return null;
}
