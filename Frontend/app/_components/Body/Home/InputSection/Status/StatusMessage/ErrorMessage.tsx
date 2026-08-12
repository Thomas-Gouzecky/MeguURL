export default function ErrorMessage({ Error }: { Error: ResponseErrorProp }) {
	return (
		<div className="w-full">
			<h1>
				Error: {Error.code} {Error.name}
			</h1>
			<p>{Error.description.error}</p>
		</div>
	);
}
