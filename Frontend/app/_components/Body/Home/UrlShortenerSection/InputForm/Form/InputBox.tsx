import { useFormStatus } from "react-dom";
import { useState } from "react";

export default function InputBox({ status }: { status: StatusProp }) {
	const [inputUrl, setInputUrl] = useState<string>("");
	const { pending } = useFormStatus();

	const statusStyle: Record<Status, string> = {
		success:
			"text-[#2aa136] hover:border-green-500 hover:text-green-500 focus:border-green-500 focus:text-green-500 focus:shadow-[0_0_10px_3px_rgba(34,231,94,0.35)]",

		error: "text-[#880808] border-[#6c0d0d] hover:border-[#9b0929] hover:text-[#ad0303] focus:border-[#9b0929] focus:text-[#ad0303] focus:shadow-[0_0_10px_3px_rgba(255,48,48,0.35)]",

		idle: "border-[#402a2a] text-[#ccb14e] hover:border-[#87732a] hover:text-[#fada64] focus:border-[#a78f3b] focus:text-[#fada64] focus:shadow-[0_0_10px_3px_rgba(167,143,59,0.35)]",
	};

	return (
		<input
			className={`${statusStyle[status.state]} flex-1 z-10 origin-center bg-[#130b0b] outline-none focus:scale-100 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.25)] border-2 button-padding button-rounding relative text-lg font-bold overflow-hidden transition-[transform,box-shadow,border-color,color] duration-300`}
			name="inputUrl"
			value={inputUrl}
			type="text"
			autoComplete="off"
			placeholder="Example: google.com"
			onChange={(e) => setInputUrl(e.target.value)}
			disabled={pending}
		/>
	);
}
