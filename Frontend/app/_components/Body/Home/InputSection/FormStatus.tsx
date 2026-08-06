import { FaTriangleExclamation, FaCircleCheck } from "react-icons/fa6";

type Props = {
	status: "idle" | "success" | "error";
};

export default function FormStatus({ status }: Props) {
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
