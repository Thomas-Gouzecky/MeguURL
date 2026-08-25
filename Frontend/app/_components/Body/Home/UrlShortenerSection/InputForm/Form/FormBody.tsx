import DisplayStatus from "./DisplayStatus/DisplayStatus";
import SubmitButton from "./SubmitButton";
import InputBox from "./InputBox";

export default function FormBody({ statusQueue, status }: { statusQueue: StatusItem[]; status: StatusProp }) {
	return (
		<div className="relative flex w-full flex-col gap-2 md:flex-row md:items-center">
			<div className="flex min-w-0 flex-1 items-center gap-2">
				<DisplayStatus statusQueue={statusQueue} />
				<InputBox status={status} />
			</div>

			<div className="w-full shrink-0 md:w-auto">
				<SubmitButton />
			</div>
		</div>
	);
}
