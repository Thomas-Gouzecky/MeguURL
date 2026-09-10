"use client";

import { useEffect } from "react";
import useQrCode from "@/hooks/useQrCode";
import QRFormButton from "./components/QRFormButton";
import QRFormInput from "./components/QRFormInput";
import QRFormStatusIconObject from "./components/QRFormStatusIconObject";

export default function QRForm() {
	const { status, isLoading, body, error, create } = useQrCode();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const inputText = formData.get("QRInput") as string;

		await create({ data: inputText });
	}

	useEffect(() => {
		console.log("Body:", body);
		console.log("Error:", error);
	}, [body, error]);
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 border rounded"
		>
			<QRFormStatusIconObject
				status={status}
				isLoading={isLoading}
				body={body}
				error={error}
			/>
			<QRFormInput />
			<QRFormButton />
		</form>
	);
}
