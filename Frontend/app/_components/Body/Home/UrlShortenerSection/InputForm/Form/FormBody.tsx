import DisplayStatus from "./DisplayStatus/DisplayStatus";
import SubmitButton from "./SubmitButton";
import InputBox from "./InputBox";

export default function FormBody({ statusQueue, status }: { statusQueue: StatusItem[]; status: StatusProp }) {
	return (
		<div className="relative flex items-center w-full gap-2">
			<DisplayStatus statusQueue={statusQueue} />

			<div className="flex items-center gap-4 w-full">
				<InputBox status={status} />

				<SubmitButton />
			</div>
		</div>
	);
}
