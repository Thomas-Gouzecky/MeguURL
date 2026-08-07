import { FaTriangleExclamation, FaCircleCheck } from "react-icons/fa6";

export default function FormStatus({ status }: { status: StatusProp }) {
	if (status === "error") {
		return (
			<FaTriangleExclamation
				color="white"
				size={24}
			/>
		);
	}

	if (status === "success") {
		return (
			<FaCircleCheck
				color="white"
				size={24}
			/>
		);
	}

	return null;
}
