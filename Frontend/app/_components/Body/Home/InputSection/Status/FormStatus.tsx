import { FaTriangleExclamation, FaCircleCheck } from "react-icons/fa6";

export default function FormStatus({ status }: { status: StatusProp }) {
	if (status === "error") {
		return (
			<FaTriangleExclamation
				color="#9b0929"
				size={32}
			/>
		);
	}

	if (status === "success") {
		return (
			<FaCircleCheck
				color="#20c40a"
				size={32}
			/>
		);
	}

	return null;
}
