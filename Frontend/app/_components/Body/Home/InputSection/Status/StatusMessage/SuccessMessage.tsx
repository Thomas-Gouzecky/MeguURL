type SuccessMessageProp = {};

export default function SuccessMessage({ Success }: { Success: SuccessMessageProp }) {
	return (
		<div>
			<span>Successfully Posted to Database!</span>
		</div>
	);
}
