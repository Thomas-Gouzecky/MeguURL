export default function QRCodeImage({ QRCode }: { QRCode: React.ReactNode }): React.JSX.Element {
	return (
		<div className="shrink-0 overflow-visible">
			<div className="overflow-hidden rounded-lg">{QRCode}</div>
		</div>
	);
}
