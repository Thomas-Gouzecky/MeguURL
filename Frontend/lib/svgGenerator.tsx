export function CreateQRCodeSVG({ size, matrix }: { size: number; matrix: string }): React.JSX.Element {
	let path = "";

	for (let index = 0; index < matrix.length; index++) {
		if (matrix[index] !== "1") continue;

		const x = (index % size) + 1;
		const y = Math.floor(index / size) + 1;

		path += `M${x} ${y}h1v1h-1z`;
	}

	return (
		<svg
			viewBox={`0 0 ${size + 2} ${size + 2}`}
			width="100%"
			height="100%"
			shapeRendering="crispEdges"
		>
			<rect
				width={size + 2}
				height={size + 2}
				fill="white"
			/>

			<path
				d={path}
				fill="black"
			/>
		</svg>
	);
}
