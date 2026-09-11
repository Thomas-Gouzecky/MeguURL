import { formInputStatusStyles } from "@/lib/utils";

export default function QRFormInput({ status, isLoading }: { status: number | null; isLoading: boolean }) {
	const statusString: "success" | "error" | "idle" = status === 200 ? "success" : status === null ? "idle" : "error";
	return (
		<input
			className={`${formInputStatusStyles[statusString]} min-w-0 flex-1 z-10 origin-center bg-[#130b0b] outline-none focus:scale-100 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.25)] border-2 button-padding button-rounding text-lg font-bold overflow-hidden transition-[transform,box-shadow,border-color,color] duration-300`}
			name="QRInput"
			type="text"
			autoComplete="off"
			placeholder="Example: MeguURL"
			disabled={isLoading}
		/>
	);
}
