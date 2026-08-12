type SuccessMessageProp = {};

export default function SuccessMessage({ Success }: { Success: SuccessMessageProp }) {
	return (
		<div>
			<h1>Successfully Posted to Database!</h1>
		</div>
	);
}
