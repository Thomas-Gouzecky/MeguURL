import QRFormButton from "./components/QRFormButton";
import QRFormInput from "./components/QRFormInput";
import QRFormStatusIconObject from "./components/QRFormStatusIconObject";

export default function QRForm({
	status,
	isLoading,
	body,
	error,
	create,
}: {
	status: number | null;
	isLoading: boolean;
	body: QrCodeAPIResponse | null;
	error: HTTPValidationError | null;
	create: (request: QrCodeAPIRequest) => Promise<Response>;
}) {
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const inputText = formData.get("QRInput") as string;

		await create({ data: inputText });
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-row gap-4 w-full max-w-lg mx-auto p-4 border rounded overflow-visible"
		>
			<div className="relative flex w-full flex-col gap-2 md:flex-row md:items-center">
				<QRFormStatusIconObject
					status={status}
					isLoading={isLoading}
					body={body}
					error={error}
				/>
				<QRFormInput
					status={status}
					isLoading={isLoading}
				/>
				<QRFormButton isLoading={isLoading} />
			</div>
		</form>
	);
}
