type StatusErrorProp = {
	name: string;
	code: number;
	description: string;
};

export default function ErrorMessage({ Error }: { Error: StatusErrorProp }) {
	return (
		<div className="w-full">
			<h1>Error: {Error.name}</h1>
			<h3>{Error.code}</h3>
			<p>{Error.description}</p>
		</div>
	);
}
