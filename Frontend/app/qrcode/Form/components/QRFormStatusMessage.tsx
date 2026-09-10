export default function QRFormStatusMessage({ message }: { message: string | string[] | null }) {
	return (
		<div className="absolute top-0 right-0 overflow-visible flex items-center justify-center w-fit p-2 mt-2 text-sm text-gray-700 bg-gray-100 border rounded">
			{message}
		</div>
	);
}
