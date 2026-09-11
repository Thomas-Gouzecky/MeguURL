export default function QRCodeImage({
	QRCode,
	Size,
}: {
	QRCode: React.ReactNode;
	Size: "small" | "medium" | "large";
}): React.JSX.Element {
	let className = "shrink-0 overflow-visible m-auto";
	switch (Size) {
		case "small":
			className += " w-32 h-32";
			break;
		case "medium":
			className += " w-64 h-64";
			break;
		case "large":
			className += " w-96 h-96";
			break;
	}
	return (
		<div className={className}>
			<div className="overflow-hidden rounded-lg">{QRCode}</div>
		</div>
	);
}
