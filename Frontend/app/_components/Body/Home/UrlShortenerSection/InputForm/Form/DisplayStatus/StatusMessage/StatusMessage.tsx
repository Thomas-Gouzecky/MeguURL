import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

export default function StatusMessage({ status }: { status: StatusProp }) {
	return (
		<div className="relative">
			{status.state === "error" ? (
				<ErrorMessage Error={status.error} />
			) : status.state === "success" ? (
				<SuccessMessage Success={{}} />
			) : null}
		</div>
	);
}
