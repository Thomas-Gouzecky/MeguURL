export default function QRFormStatusMessage({ message }: { message: string | string[] | null }) {
	return <div className="flex items-center justify-center w-fit">{message}</div>;
}
