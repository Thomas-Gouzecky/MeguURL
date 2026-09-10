export default function DisplayQRCodeCreator({ code }: { code: string | undefined }) {
	const baseURL = typeof window !== "undefined" ? window.location.host : "";

	return (
		<div>
			{code && (
				<div className="h-15 w-full flex justify-center items-center">
					Hello {baseURL}/{code}
				</div>
			)}
		</div>
	);
}
