export default function QRCodeImage({ QRCode }: { QRCode: React.ReactNode }): React.JSX.Element {
	return (
		<div className="shrink-0 w-[210px] overflow-visible">
			<div>{QRCode}</div>
		</div>
	);
}
