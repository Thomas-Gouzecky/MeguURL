import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

export default function StatusMessage({ status }: { status: StatusProp }) {
	return (
		<div className="relative">
			{status === "error" ? (
				<ErrorMessage Error={{ name: "tmp", code: 404, description: "Not found" }} />
			) : (
				<SuccessMessage Success={{}} />
			)}
		</div>
	);
}
