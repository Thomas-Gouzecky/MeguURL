export default function QRCodeImage({ QRCode }: { QRCode: React.ReactNode }): React.JSX.Element {
	return (
		<div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4 border rounded overflow-visible">
			<div>{QRCode}</div>
		</div>
	);
}
