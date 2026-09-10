export default function QRFormStatusMessage({ message }: { message: string | string[] | null }) {
	return (
		<div className="flex items-center justify-center w-fit p-2 text-sm text-gray-700 bg-gray-100 border rounded">
			{message}
		</div>
	);
}
