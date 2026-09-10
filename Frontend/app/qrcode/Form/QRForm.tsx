"use client";

import QRFormButton from "./components/QRFormButton";
import QRFormInput from "./components/QRFormInput";

export default function QRForm() {
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const inputText = formData.get("QRInput") as string;

		console.log("Input text for QR code generation:", inputText);
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 border rounded"
		>
			<QRFormInput />
			<QRFormButton />
		</form>
	);
}
