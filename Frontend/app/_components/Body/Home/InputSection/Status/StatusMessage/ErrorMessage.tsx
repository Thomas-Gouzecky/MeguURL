export default function ErrorMessage({ Error }: { Error: ResponseErrorProp }) {
	return (
		<div className="w-full">
			<h1>
				{Error.code} - {Error.name}
			</h1>
			<span>{Error.description.error}</span>
		</div>
	);
}
